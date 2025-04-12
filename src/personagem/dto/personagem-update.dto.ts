import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNomeAventureiro {
  @ApiProperty({
    description: 'Novo nome de aventureiro do personagem',
    example: 'Thorin Escudo de Carvalho',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
