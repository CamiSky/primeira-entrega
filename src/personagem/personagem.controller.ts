import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonagemRequest } from './dto/personagem-request.dto';
import { PersonagemResponse } from './dto/personagem-response.dto';
import { AdicionarItem } from './dto/personagem-item.dto';
import { UpdateNomeAventureiro } from './dto/personagem-update.dto';
import { ItemMagicoResponse } from 'src/item-magico/dto/item-response.dto';

@ApiTags('Personagens')
@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('cadastrar')
  @ApiOperation({summary: 'Cadastrar Personagem'})
  @ApiResponse({ status: 201, description: 'Personagem cadastrado com sucesso', type: PersonagemResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({ type: PersonagemRequest})
  async cadastrarPersonagem(@Body() personagemRequest: any): Promise<PersonagemResponse> {
    return await this.personagemService.cadastrarPersonagem(personagemRequest);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('adicionar-item-magico/:idPersonagem')
  @ApiOperation({summary: 'Adicionar Item Magico ao Personagem'})
  @ApiResponse({ status: 201, description: 'Item Mágico adicionado ao Personagem com sucesso', type: PersonagemResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiParam({
    name: 'idPersonagem',
    required: true,
    description: 'ID do personagem que o item será aplicado',
    example: 1,
  })
  @ApiBody({ type: AdicionarItem})
  async adicionarItemAoPersonagem(@Param('idPersonagem') idPersonagem: string, @Body() item: any): Promise<PersonagemResponse> {
    return await this.personagemService.adicionarItemAoPersonagem(+idPersonagem, item);
  }

  @HttpCode(HttpStatus.OK)
  @Get('listar')
  @ApiOperation({summary: 'Listar Personagens'})
  @ApiResponse({ status: 200, description: 'Personagens listados com sucesso', type: PersonagemResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async listarPersonagens(): Promise<PersonagemResponse[]> {
    return await this.personagemService.listarPersonagens();
  }

  @HttpCode(HttpStatus.OK)
  @Get('buscar/:idPersonagem')
  @ApiOperation({summary: 'Buscar Personagem'})
  @ApiResponse({ status: 200, description: 'Personagem encontrado com sucesso', type: PersonagemResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiParam({
    name: 'idPersonagem',
    required: true,
    description: 'ID do personagem que o item será aplicado',
    example: 1,
  })
  async buscarPersonagem(@Param('idPersonagem') idPersonagem: string): Promise<PersonagemResponse> {
    return await this.personagemService.buscarPersonagem(+idPersonagem);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('atualizar-nome/:idPersonagem')
  @ApiOperation({summary: 'Atualizar nome do Personagem'})
  @ApiResponse({ status: 201, description: 'Nome do Personagem atualizado com sucesso', type: PersonagemResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiParam({
    name: 'idPersonagem',
    required: true,
    description: 'ID do Personagem que o nome de aventureiro será alterado',
    example: 1,
  })
  @ApiBody({ type: UpdateNomeAventureiro})
  async atualizarNomePersonagem(@Param('idPersonagem') idPersonagem: string, @Body() nome: any): Promise<PersonagemResponse> {
    return await this.personagemService.atualizarNomePersonagem(+idPersonagem, nome);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('deletar/:idPersonagem')
  @ApiOperation({summary: 'Deletar Personagem'})
  @ApiResponse({ status: 204, description: 'Personagem deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiParam({
    name: 'idPersonagem',
    required: true,
    description: 'ID do Personagem que será deletado',
    example: 1,
  })
  async deletarPersonagem(@Param('idPersonagem') idPersonagem: string): Promise<void> {
    await this.personagemService.deletarPersonagem(+idPersonagem);
  }

  @HttpCode(HttpStatus.OK)
  @Get('listar-itens-magicos/:idPersonagem')
  @ApiOperation({summary: 'Listar Itens Mágicos do Personagem'})
  @ApiResponse({ status: 200, description: 'Itens Mágicos listados com sucesso', type: [ItemMagicoResponse] })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async buscarItensMagicos(@Param('idPersonagem') idPersonagem: string): Promise<ItemMagicoResponse[]> {
    return await this.personagemService.buscarItensMagicos(+idPersonagem);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':idPersonagem/item-magico/:idItemMagico')
  @ApiOperation({summary: 'Deletar Item Mágico do Personagem'})
  @ApiResponse({ status: 204, description: 'Item Mágico deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiParam({
    name: 'idPersonagem',
    required: true,
    description: 'ID do Personagem que será deletado',
    example: 1,
  })
  @ApiParam({
    name: 'idItemMagico',
    required: true,
    description: 'ID do Item Mágico que será deletado',
    example: 1,
  })
  async deletarItemMagico(@Param('idPersonagem') idPersonagem: string, @Param('idItemMagico') idItemMagico: string): Promise<void> {
    await this.personagemService.deletarItemMagico(+idPersonagem, +idItemMagico);
  }

  @HttpCode(HttpStatus.OK)
  @Get('listar-amuletos/:idPersonagem')
  @ApiOperation({summary: 'Listar Amuletos do Personagem'})
  @ApiResponse({ status: 200, description: 'Amuletos listados com sucesso', type: ItemMagicoResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async listarAmuletos(@Param('idPersonagem') idPersonagem: string): Promise<ItemMagicoResponse | []> {
    return await this.personagemService.listarAmuletos(+idPersonagem);
  }
}
