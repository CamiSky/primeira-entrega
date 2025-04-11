import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PersonagemResponse } from './dto/personagem-response.dto';
import { PersonagemRequest } from './dto/personagem-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemEnum } from 'src/item-magico/enum/item.enum';
import { ItemMagicoService } from 'src/item-magico/item-magico.service';
import { ItemMagicoResponse } from 'src/item-magico/dto/item-response.dto';
import { ClasseEnum } from './enum/classe.enum';
import { AmuletoDuplicadoException, DefesaComArmaException, ForcaComArmaduraException } from './erros/personagem.erros';
import { AdicionarItem } from './dto/personagem-item.dto';
import { ItensInvalidosException } from 'src/item-magico/erros/itens.erros';

@Injectable()
export class PersonagemService {
    constructor(
        readonly prisma: PrismaService,
        readonly itensMagicosSevice: ItemMagicoService,
    ){}

    async verificarAtributos (itensMagicos: number[], forca: number, defesa: number): Promise<number[] | ItemMagicoResponse[]>{

        let itens: number[] | ItemMagicoResponse[] = [];

        if (Array.isArray(itensMagicos) && itensMagicos.length > 0) {
            itens = await this.itensMagicosSevice.verificarItem(itensMagicos);

            if(typeof itens[0] === 'object' && 'item' in itens[0]){
                let countAmuleto: number = 0;
                for(let item of itens as ItemMagicoResponse[]) {
                    if(item.item === ItemEnum.ARMA && defesa != 0){
                        throw new DefesaComArmaException();
                    }
                    if (item.item === ItemEnum.ARMADURA && forca != 0){
                        throw new ForcaComArmaduraException();
                    }
                    if (item.item === ItemEnum.AMULETO){
                        countAmuleto++;
                    } 
                }
                if (countAmuleto > 1){
                    throw new AmuletoDuplicadoException();
                }
            }
        }
        return itens;
    }

    async cadastrarPersonagem (personagem: PersonagemRequest): Promise <PersonagemResponse>{
        try {
            const {itensMagicos, ...restPersonagem} = personagem;
            const itens = await this.verificarAtributos(itensMagicos, personagem.forca, personagem.defesa);

            const newPersonagem = await this.prisma.personagem.create({
                data: {
                    ...restPersonagem,
                    itensMagicos: {
                        connect: itensMagicos.map((id) => ({ id }))
                    },
                },
                include: {
                    itensMagicos: true
                }
            });

            return {
                id: newPersonagem.id,
                nome: newPersonagem.nome,
                nome_aventureiro: newPersonagem.nome_aventureiro,
                classe: newPersonagem.classe as ClasseEnum,
                level: newPersonagem.level,
                forca: newPersonagem.forca,
                defesa: newPersonagem.defesa,
                itensMagicos: (itens).map((item) => ({
                  id: item.id,
                  nome: item.nome,
                  item: item.item,
                  forca: item.forca,
                  defesa: item.defesa,
                })),
            };
        } catch (erro) {
            if (
                erro instanceof ItensInvalidosException ||
                erro instanceof AmuletoDuplicadoException ||
                erro instanceof ForcaComArmaduraException ||
                erro instanceof DefesaComArmaException
            ) {
                throw erro;
            }
            console.error('Erro inesperado ao verificar item:', erro);
            throw new InternalServerErrorException();
        }
    }

    async adicionarItemAoPersonagem (idPersonagem: number, itemAdd : AdicionarItem): Promise<PersonagemResponse> {
        try {
            const personagem = await this.prisma.personagem.findUnique({
                where: {id: idPersonagem}
            });
            const itensMagicos = await this.verificarAtributos(itemAdd.id, personagem.forca, personagem.defesa);

            const pernosgemAddItem = await this.prisma.personagem.update({
                where: { id: idPersonagem},
                data: {
                    itensMagicos: {
                        connect: itensMagicos.map((item) => ({ id: item.id }))
                    },
                },
                include: {
                    itensMagicos: true,
                },
            });
            return {
                id: personagem.id,
                nome: personagem.nome,
                nome_aventureiro: personagem.nome_aventureiro,
                classe: personagem.classe as ClasseEnum,
                level: personagem.level,
                forca: personagem.forca,
                defesa: personagem.defesa,
                itensMagicos: (pernosgemAddItem.itensMagicos).map((item) => ({
                  id: item.id,
                  nome: item.nome,
                  item: item.item,
                  forca: item.forca,
                  defesa: item.defesa,
                })),
            };
        } catch (erro) {
            if (
                erro instanceof ItensInvalidosException ||
                erro instanceof AmuletoDuplicadoException ||
                erro instanceof ForcaComArmaduraException ||
                erro instanceof DefesaComArmaException
            ) {
                throw erro;
            }
            console.error('Erro inesperado ao verificar item:', erro);
            throw new InternalServerErrorException();
        }
    }
}
