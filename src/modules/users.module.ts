import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/users.userController';
import { UserModel } from 'src/models/user.userModel';
import { UserService } from 'src/services/users.userService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
