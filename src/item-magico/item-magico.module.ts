import { Module } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { ItemMagicoController } from './item-magico.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [ItemMagicoService],
  imports: [PrismaModule]
})
export class ItemMagicoModule {}
