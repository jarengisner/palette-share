import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ColorController } from 'src/controllers/colors.colorController';
import { ColorService } from 'src/services/colors.colorService';

@Module({
  imports: [MulterModule.register()],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
