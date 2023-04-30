import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('address') address: string,
  ) {
    return this.authService.signUp(username, password, address);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('address') address: string,
  ) {
    return this.authService.signIn(username, password, address);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return this.authService.getInfo(req.body.address);
  }

  @UseGuards(AuthGuard)
  @Post('verify_token')
  verifyToken() {
    return {};
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify_signature')
  verifySignature(@Request() req) {
    return this.authService.verifySignature(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('nonce')
  nonce(@Body('address') address: string) {
    return this.authService.nonce(address);
  }
}
