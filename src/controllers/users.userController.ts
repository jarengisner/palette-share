import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/models/user.userModel';
import { UserService } from 'src/services/users.userService';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {}

  /**
   * @param username - string username of user
   * @returns usern from DB with that username
   *
   */
  @Get(':username')
  async findOneUserByUsername(@Param('username') username: string) {}

  /**
   * @param username - username of the user
   * @returns Promise that resolves in an array of our color objects (any just until structure of how we want to return is figured out)
   */
  @Get(':username/palette')
  async getUserPalleteByUsername(
    @Param('username') username: string,
  ): Promise<any[]> {}

  /**
   *
   * @param user - takes a user data transfer object (userDto class)
   * @returns Promise which resolves in a user after dto is cast to class/posted to the database
   *
   */
  @Post()
  async createNewUser(@Body() user: userDto): Promise<User> {
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
  @Post('palette')
  async postPalletteToUser(colorObject: any): Promise<User> {}
}
