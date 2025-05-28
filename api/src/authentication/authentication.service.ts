import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.find({ email });
    if (!user) {
      return new HttpException('User not found', 404, { cause: new Error() });
    }
  }
}
