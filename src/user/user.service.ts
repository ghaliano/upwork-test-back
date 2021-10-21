import { Inject, Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { User } from 'src/entity/User';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async findOneBy(params: any): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: params });
  }
  
  async deleteAccount(userId: number) {
    const user= await this.userRepository.findOne(userId);
    return await this.userRepository.remove(user);
  }

  async update(id: number, updateQuoteDto: UpdateUserDto) {
    const entityManager = getManager();
    let quote = Object.assign(new User(), updateQuoteDto);
    quote.id = id;
    await  entityManager.save(quote);

    return this.userRepository.findOne(quote.id);
  }
}