import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
    return this.itemMagicoService.cadastrarItemMagico(itemRequest);
  }
}
