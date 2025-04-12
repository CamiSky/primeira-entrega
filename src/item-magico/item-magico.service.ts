import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemMagicoResponse } from './dto/item-response.dto';
import { ItemMagicoNaoEncontradoException, ItensInvalidosException } from './erros/itens.erros';
import { ItemMagicoRequest } from './dto/item-request.dto';
import { ItemEnum } from './enum/item.enum';

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

    async buscarItemMagico(idItemMagico: number): Promise<ItemMagicoResponse> {
        try {
            const itemMagico = await this.prisma.itemMagico.findUnique({
                where: { id: idItemMagico},
            });

            if (!itemMagico) {
                throw new ItemMagicoNaoEncontradoException(idItemMagico);
            }
                
            return {
                id: itemMagico.id,
                nome: itemMagico.nome,
                item: itemMagico.item,
                forca: itemMagico.forca,
                defesa: itemMagico.defesa,
            };
        } catch (erro) {
            if(erro instanceof ItemMagicoNaoEncontradoException) throw erro;
            throw new InternalServerErrorException();
        }
    }

    async listarItensMagicos (): Promise<ItemMagicoResponse[]>{
        try {
            const itensMagicos = await this.prisma.itemMagico.findMany();

            return itensMagicos.map((item) => ({
                id: item.id,
                nome: item.nome,
                item: item.item as ItemEnum,
                forca: item.forca,
                defesa: item.defesa,
              }));
        } catch (erro) {
            console.error('Erro inesperado ao buscar os itens mágicos:', erro);
            throw new InternalServerErrorException();
        }
    }
}
