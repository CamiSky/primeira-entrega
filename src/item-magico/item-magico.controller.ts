import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemMagicoRequest } from './dto/item-request.dto';
import { ItemMagicoResponse } from './dto/item-response.dto';

@ApiTags('Itens Mágicos')
@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('cadastrar')
  @ApiOperation({summary: 'Cadastrar Item Mágico'})
  @ApiResponse({ status: 201, description: 'Item Mágico cadastrado com sucesso', type: ItemMagicoResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({ type: ItemMagicoRequest })
  async cadastrarItemMagico(@Body() itemRequest: any): Promise<ItemMagicoResponse> {
    return await this.itemMagicoService.cadastrarItemMagico(itemRequest);
  }

  @HttpCode(HttpStatus.OK)
  @Get('listar')
  @ApiOperation({summary: 'Listar Itens Mágicos'})
  @ApiResponse({ status: 200, description: 'Itens Mágicos listados com sucesso', type: ItemMagicoResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async listarItensMagicos(): Promise<ItemMagicoResponse[]> {
    return await this.itemMagicoService.listarItensMagicos();
  }

  @HttpCode(HttpStatus.OK)
  @Get('buscar/:idItemMagico')
  @ApiOperation({summary: 'Buscar Item Mágico'})
  @ApiResponse({ status: 200, description: 'Item Mágico encontrado com sucesso', type: ItemMagicoResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({ type: ItemMagicoRequest })
  async buscarItemMagico(@Param('idItemMagico') idItemMagico: string): Promise<ItemMagicoResponse> {
    return await this.itemMagicoService.buscarItemMagico(+idItemMagico);
  }
}
