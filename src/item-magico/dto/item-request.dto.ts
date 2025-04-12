import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsInt, IsString, IsEnum } from 'class-validator';
import { ItemEnum } from '../enum/item.enum';

export class ItemMagicoRequest {
  @ApiProperty({
    example: 'Espada Flamejante',
    description: 'Nome do item mágico',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: ItemEnum.ARMA,
    description: 'Tipo do item mágico (ARMA, ARMADURA, AMULETO)',
    enum: ItemEnum,
  })
  @IsEnum(ItemEnum)
  item: ItemEnum;

  @ApiProperty({
    example: 10,
    description: 'Valor de força do item (0 a 10)',
  })
  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @ApiProperty({
    example: 0,
    description: 'Valor de defesa do item (0 a 10)',
  })
  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;
}
