import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", type: String })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.userService.find({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateUser({
      where: { id },
      data: updateUser,
    });
  }
}
