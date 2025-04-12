import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { ItemMagicoModule } from 'src/item-magico/item-magico.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PersonagemController],
  providers: [PersonagemService],
  imports: [PrismaModule, ItemMagicoModule]
})
export class PersonagemModule {}
