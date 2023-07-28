import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/entities/user.entity';
import * as moment from 'moment';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.uuid };
    return {
      userId: user.uuid,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(usernameormail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(usernameormail);

    if (user && (await bcrypt.compare(pass, user.password))) {
      if (user.role != UserRole.ADMIN) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async getRefreshToken(user: User): Promise<string> {
    const userDataToUpdate = {
      refreshToken: nanoid(30),
      refreshTokenExp: moment().day(7).format('YYYY/MM/DD'), //expires after one week
    };

    userDataToUpdate.refreshToken = await this.generateHash(
      userDataToUpdate.refreshToken,
    );

    const userWithRefreshToken = {
      username: user.username,
      currentHashedRefreshToken: userDataToUpdate.refreshToken,
    };

    await this.usersService.update(user.uuid, userWithRefreshToken, null);
    return userDataToUpdate.refreshToken;
  }

  public async validateRefreshToken(username: string, refreshToken: string): Promise<User> {
    const currentDate = moment().format('YYYY/MM/DD');
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    //     {where: {username: user.username, refreshToken: refreshTokenExp: MoreThanOrEqual(currentDate) }}
    if (user.currentHashedRefreshToken == refreshToken) {

    }
    return user;
  }

  // TODO; remove dup code
  async generateHash(token: string) {
    const saltOrRounds = 5;
    return await bcrypt.hash(token, saltOrRounds);
  }
}
