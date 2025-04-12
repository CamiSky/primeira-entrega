import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemMagicoResponse } from './dto/item-response.dto';
import { ItensInvalidosException } from './erros/itens.erros';
import { ItemMagicoRequest } from './dto/item-request.dto';

@Injectable()
export class ItemMagicoService {
    constructor (
        readonly prisma: PrismaService,
    ){}

    async verificarItem(ids: number[]): Promise <ItemMagicoResponse[] | number[]>{
        try{
            const itens = await this.prisma.itemMagico.findMany({
                where: {
                    id: {in: ids}
                }
            }); 
    
            if (itens.length != ids.length){
                const idsInvalidos = ids.filter(id =>!itens.map(item => item.id).includes(id));
                throw new ItensInvalidosException(idsInvalidos);
            }

            return itens;
        } catch(erro) {
            if (erro instanceof ItensInvalidosException) {
                throw erro;
            }
        
            console.error('Erro inesperado ao verificar itens mágicos:', erro);
            throw new InternalServerErrorException();
        }
    }

    async cadastrarItemMagico(itemRequest: ItemMagicoRequest): Promise<ItemMagicoResponse>{
        try {
            const newItemMagico = await this.prisma.itemMagico.create({
                data: {
                    ...itemRequest
                }
            });
            return newItemMagico;
        } catch (erro) {
            throw new InternalServerErrorException('Erro ao cadastrar item mágico');
        }
    }
}
