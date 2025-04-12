import { ApiProperty } from "@nestjs/swagger";
import { ItemEnum } from "../enum/item.enum";

export class ItemMagicoResponse {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do item mágico',
  })
  id: number;

  @ApiProperty({
    example: 'Espada Flamejante',
    description: 'Nome do item mágico',
  })
  nome: string;

  @ApiProperty({
    example: ItemEnum.ARMA,
    description: 'Tipo do item mágico (ARMA, ARMADURA, AMULETO)',
  })
  item: string;

  @ApiProperty({
    example: 10,
    description: 'Valor de força. Se for uma ARMADURA, será 0',
  })
  forca: number;

  @ApiProperty({
    example: 0,
    description: 'Valor de defesa. Se for uma ARMA, será 0',
  })
  defesa: number;
}
