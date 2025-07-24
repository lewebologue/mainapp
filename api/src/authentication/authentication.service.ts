import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwt: JwtService,
  ) {}

  async signIn(
    identifier: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmailOrName(identifier);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const userPassword: string = String(user.password);
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 403);
    }

    const payload = { name: user.name, role: user.Role };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
