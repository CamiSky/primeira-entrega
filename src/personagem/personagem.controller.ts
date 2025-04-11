import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonagemRequest } from './dto/personagem-request.dto';
import { PersonagemResponse } from './dto/personagem-response.dto';
import { AdicionarItem } from './dto/personagem-item.dto';

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
    return this.personagemService.cadastrarPersonagem(personagemRequest);
  }

  @HttpCode(HttpStatus.OK)
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
    return this.personagemService.adicionarItemAoPersonagem(+idPersonagem, item);
  }
}
