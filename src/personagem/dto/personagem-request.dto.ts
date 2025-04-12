import { IsEnum, IsInt, IsNotEmpty, IsString, Min, ArrayNotEmpty, ArrayUnique, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClasseEnum } from '../enum/classe.enum';

export class PersonagemRequest {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Thorin, o Bravo' })
  @IsString()
  @IsNotEmpty()
  nome_aventureiro: string;

  @ApiProperty({ enum: ClasseEnum, example: ClasseEnum.GUERREIRO })
  @IsEnum(ClasseEnum)
  classe: ClasseEnum;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  level: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  forca: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  defesa: number;

  @ApiProperty({
    type: [Number],
    description: 'Lista de IDs dos itens mágicos que o personagem tem, pode estar vazia',
    example: [],
  })
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  itensMagicos: number[];
}
