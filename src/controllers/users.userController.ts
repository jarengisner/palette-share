import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user.userDto';
import { User } from 'src/models/user.userModel';
import { UserService } from 'src/services/users.userService';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw new HttpException(
        `Error in find all users controller: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @param username - string username of user
   * @returns usern from DB with that username
   *
   */
  @Get(':username')
  async findOneUserByUsername(@Param('username') username: string) {
    try {
      const locatedUser: User =
        await this.userService.findOneByUsername(username);

      if (locatedUser) {
        return locatedUser;
      } else {
        throw new HttpException(
          'No users found with that username',
          HttpStatus.NO_CONTENT,
        );
      }
    } catch (err) {
      throw new HttpException(
        `Error in finding user by username controller: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @param username - username of the user
   * @returns Promise that resolves in an array of our color objects (any just until structure of how we want to return is figured out)
   */
  @Get(':username/palette')
  async getUserPalleteByUsername(
    @Param('username') username: string,
  ): Promise<any[]> {
    try {
      const searchUser: User =
        await this.userService.findOneByUsername(username);

      return searchUser.palette;
    } catch (err) {
      throw new HttpException(
        `Error fetching pallete from user in controller: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   * @param user - takes a user data transfer object (userDto class)
   * @returns Promise which resolves in a user after dto is cast to class/posted to the database
   *
   */
  @Post()
  async createNewUser(@Body() user: UserDto): Promise<User> {
    try {
      return this.userService.createUser(user);
    } catch (err) {
      throw new HttpException(
        `Error while creating a user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   * @param colorObject - this is going to be the object that we standardly create from a request to the colorpicker
   * @returns Promise resolves in a User with the updated palette array, containing new object
   *
   */
  @Post('palette/post/:username')
  async postPalletteToUser(
    @Param('username') username: string,
    colorObject: any,
  ): Promise<User> {
    try {
      return await this.userService.postPalette(username, colorObject);
    } catch (err) {
      throw new HttpException(
        `Error in posting pallete in controller: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
