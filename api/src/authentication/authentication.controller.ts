import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { Public } from '../shared/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() body: { identifier: string; password: string }) {
    return this.authService.signIn(body.identifier, body.password);
  }
}
