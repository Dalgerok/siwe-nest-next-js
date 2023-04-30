import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { globalConstants } from 'src/global_constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(globalConstants.user_repository)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findOneByAddress(address: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ address });
  }

  async findOneByNonce(nonce: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ nonce });
  }

  async register(
    username: string,
    password: string,
    address: string,
  ): Promise<User | undefined> {
    const user1 = await this.findOne(username);
    const user2 = await this.findOneByAddress(address);
    if (user1 || user2?.username) {
      throw new BadRequestException('Username or address already exists');
    }
    user2.username = username;
    user2.password = password;
    return this.userRepository.save(user2);
  }

  async addNonce(address, nonce): Promise<User | undefined> {
    const user = await this.findOneByAddress(address);
    if (user) {
      user.nonce = nonce;
      return this.userRepository.save(user);
    }
    return this.userRepository.save({ address, nonce });
  }
}
