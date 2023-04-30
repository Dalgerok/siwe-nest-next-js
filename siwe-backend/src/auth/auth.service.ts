import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SiweMessage } from 'siwe';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { globalConstants } from 'src/global_constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, password, address) {
    const user = await this.usersService.findOne(username);
    if (
      !user ||
      !bcrypt.compareSync(password, user?.password) ||
      user.address !== address
    ) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      sub: user.id,
      address: user.address,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getInfo(address) {
    const user = await this.usersService.findOneByAddress(address);
    return {
      user,
    };
  }

  async signUp(username, password, address) {
    const user = await this.usersService.register(
      username,
      bcrypt.hashSync(password, globalConstants.saltRounds),
      address,
    );
    const payload = {
      username: user.username,
      sub: user.id,
      address: user.address,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifySignature(req) {
    if (!req.body) {
      throw new UnauthorizedException();
    }
    const { message, signature } = req.body;

    const siweMessage = new SiweMessage(message);
    const { success, data } = await siweMessage.verify({ signature });

    if (!success) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneByNonce(data.nonce);
    if (data.nonce !== user.nonce) {
      throw new UnauthorizedException();
    }
    return {};
  }

  async nonce(address) {
    const nonce = crypto.randomBytes(32).toString('hex');
    await this.usersService.addNonce(address, nonce);
    return {
      nonce,
    };
  }
}
