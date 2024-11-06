import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.userDto';
import { UserDocument } from 'src/models/user.userModel';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(userdto: UserDto) {
    try {
      //password hashing here

      const newUser = new this.userModel(userdto);

      return newUser.save();
    } catch (err) {
      throw new HttpException(
        `Error within creating user: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
