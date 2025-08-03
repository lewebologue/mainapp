import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller'; // Importer le contrôleur
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../shared/guard/auth/auth.guard';

@Module({
  imports: [
    UserModule, // Importer le UserModule complet
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController], // S'assurer que le contrôleur est déclaré
  providers: [AuthenticationService, AuthGuard],
  exports: [AuthenticationService, JwtModule, AuthGuard],
})
export class AuthenticationModule {}
