import { ApiProperty } from '@nestjs/swagger';
import { ClasseEnum } from '../enum/classe.enum';
import { ItemMagicoResponse } from 'src/item-magico/dto/item-response.dto';

export class PersonagemResponse {
  @ApiProperty({
    example: 1,
    description: 'ID único do personagem',
  })
  id: number;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome real do personagem',
  })
  nome: string;

  @ApiProperty({
    example: 'Thorin, o Bravo',
    description: 'Nome de aventura usado pelo personagem',
  })
  nome_aventureiro: string;

  @ApiProperty({
    enum: ClasseEnum,
    example: ClasseEnum.GUERREIRO,
    description: 'Classe do personagem (GUERREIRO, MAGO, ARQUEIRO, LADINO, BARDO)',
  })
  classe: ClasseEnum;

  @ApiProperty({
    example: 5,
    description: 'Nível atual do personagem',
  })
  level: number;

  @ApiProperty({
    example: 12,
    description: 'Valor de força do personagem',
  })
  forca: number;

  @ApiProperty({
    example: 8,
    description: 'Valor de defesa do personagem',
  })
  defesa: number;

  @ApiProperty({
    type: [ItemMagicoResponse],
    description: 'Lista de itens mágicos vinculados ao personagem',
  })
  itensMagicos: ItemMagicoResponse[];
}
