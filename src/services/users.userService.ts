import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.userDto';
import { User, UserDocument } from 'src/models/user.userModel';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  /**
   *
   * @param userDto - User data transfer object
   * @returns Promise<User> - Promise resolves in the new user object after being saved to the db
   *
   */

  async createUser(userdto: UserDto): Promise<User> {
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

  /**
   * @returns either a User array or an empty array
   */

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (err) {
      throw new HttpException(
        `Error in service to fetch all users in service layer: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   * @param username - string name of the user to locate in the database
   * @returns Promise resolving in a User object
   *
   */
  async findOneByUsername(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ username: username }).exec();
    } catch (err) {
      throw new HttpException(
        `Error in service to fetch one user by username in service layer: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   * @param username - string username of user
   * colorObject - any at the moment, subject to change
   *
   * @returns Promise resolves in an updated user in the system with new colorObject pushed in to array
   *
   */
  async postPalette(username: string, colorObject: any): Promise<User> {
    try {
      return await this.userModel.findOneAndUpdate(
        { username: username },
        { $push: { palette: colorObject } },
        { new: true },
      );
    } catch (err) {
      throw new HttpException(
        `Error in service layer adding palette to user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
