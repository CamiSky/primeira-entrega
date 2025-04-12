import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, ArrayUnique, IsInt } from 'class-validator';

export class AdicionarItem {
  @ApiProperty({
    type: [Number],
    description: 'Lista de IDs dos itens mágicos a serem adicionados ao personagem',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  id: number[];
}
