import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Importer le contrôleur
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [UserController], // Ajouter le contrôleur ici
  providers: [UserService, PrismaService],
  exports: [UserService, PrismaService],
})
export class UserModule {}
