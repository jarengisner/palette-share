import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ColorService } from 'src/services/colors.colorService';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async processPhoto(@UploadedFile() photo: Express.Multer.File): Promise<any> {
    try {
      return await this.colorService.extractColorFileUpload(photo);
    } catch (err) {
      throw new HttpException(
        `Error in controller for processing a photo: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
