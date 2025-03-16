import { Module } from '@nestjs/common';
import { CakeService } from './cake.service';
import { CakeController } from './cake.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [CakeController],
  providers: [CakeService, PrismaService],
})
export class CakeModule {}
