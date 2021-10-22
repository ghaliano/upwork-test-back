import { HttpService, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getManager } from 'typeorm';
import { User } from 'src/entity/User';
import { AxiosResponse } from 'axios'

import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisterDTO } from 'src/user/dto/user.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneBy({
      email: email,
      isEnabled: true,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async saveNewPassword(password: string, token: string) {
    const payloadDecoded = this.jwtService.decode(token);
    let queryUser = {
      email: payloadDecoded['email'],
    };

    const user = await this.userService.findOneBy(queryUser);
    user.password = await this.cryptPassword(password);
    const entityManager = getManager();
    entityManager.save(user);
    return user;
  }

  async register(data: UserRegisterDTO): Promise<boolean> {
    const entityManager = getManager();
    let user = Object.assign(new User(), data);
    user.password = await this.cryptPassword(data.password);
    user.isEnabled = true;
    await entityManager.insert(User, user);
    
    return true;
  }

  private cryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  
}
