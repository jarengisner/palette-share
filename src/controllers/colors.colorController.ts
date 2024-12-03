import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { ColorService } from 'src/services/colors.colorService';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async processPhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Req() req: Request,
  ): Promise<any> {
    try {
      if (!photo || photo == undefined) {
        console.log('Error occurs first in controller, photo is undefined');
      }

      //checking request body for bug
      console.log(req.body);
      return await this.colorService.extractColorFileUpload(photo);
    } catch (err) {
      console.log('Error occurred in controller');
      throw new HttpException(
        `Error in controller for processing a photo: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
