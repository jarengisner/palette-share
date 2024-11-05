import { Module } from '@nestjs/common';
import { ColorService } from 'src/services/colors.colorService';

@Module({
  imports: [],
  controllers: [],
  providers: [ColorService],
})
export class ColorModule {}
