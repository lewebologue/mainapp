import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/shared/interfaces/loginResponse.interface';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private usersService: UserService,
    private jwt: JwtService,
  ) {}

  async signIn(identifier: string, password: string): Promise<LoginResponse> {
    this.logger.log(`Sign-in attempt for identifier: ${identifier}`);

    const user = await this.usersService.findByEmailOrName(identifier);
    if (!user) {
      this.logger.warn(`User not found for identifier: ${identifier}`);
      throw new HttpException('User not found', 404);
    }

    const userPassword: string = String(user.password);
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for user: ${identifier}`);
      throw new HttpException('Invalid credentials', 403);
    }

    this.logger.log(`Successful sign-in for user: ${user.name}`);
    const payload = { name: user.name, role: user.Role };
    return {
      user: user.name || '',
      role: user.Role,
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
