import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'; // Import Swagger decorators
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user') // Ajout d'un tag pour regrouper les routes dans Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' }) // Description de l'opération
  @ApiBody({ type: CreateUserDto }) // Documentation du corps de la requête
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' }) // Réponse en cas de succès
  @ApiResponse({ status: 400, description: 'Requête invalide.' }) // Réponse en cas d'erreur
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' }) // Description de l'opération
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", type: String }) // Documentation du paramètre
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès.',
  }) // Réponse en cas de succès
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }) // Réponse en cas d'erreur
  findOne(@Param('id') id: string) {
    return this.userService.find({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' }) // Description de l'opération
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", type: String }) // Documentation du paramètre
  @ApiBody({ type: UpdateUserDto }) // Documentation du corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
  }) // Réponse en cas de succès
  @ApiResponse({ status: 400, description: 'Requête invalide.' }) // Réponse en cas d'erreur
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }) // Réponse en cas d'erreur
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateUser({
      where: { id },
      data: updateUser,
    });
  }
}
