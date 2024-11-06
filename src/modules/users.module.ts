import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from 'src/models/user.userModel';
import { UserService } from 'src/services/users.userService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserModel }])],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
