import { Module } from '@nestjs/common';
import { PersonagemModule } from './personagem/personagem.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemMagicoModule } from './item-magico/item-magico.module';

@Module({
  imports: [PersonagemModule, PrismaModule, ItemMagicoModule],
})
export class AppModule {}
