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
import Palette from 'src/types/Palette';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  /**
   * Uploads photo to processing. When this happens, it should return the colors, however the bug is residing in the service layer
   *
   * @param photo - file form data leading to image file
   * @returns promise of any, going to be mapped to a file that allows us to access the colors directly
   *
   * Need to fix bug in the service, controller layer is receiving the file correctly, yet service is not it seems..
   */
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async processPhoto(@UploadedFile() photo: Express.Multer.File): Promise<Palette> {
    try {
      return await this.colorService.extractColorFileUpload(photo);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(
          `${err.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * The file successfully passes to the next piece of the function, the error is occurring in the processing of the photo
   *
   */
  @Post('test')
  @UseInterceptors(FileInterceptor('photo'))
  async testUpload(@UploadedFile() photo: Express.Multer.File): Promise<any> {
    try {
      if (!photo) {
        console.error('No file uploaded');
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }

      console.log('Successful upload to test endpoint:', {
        originalName: photo.originalname,
        mimeType: photo.mimetype,
        size: photo.size,
      });

      return {
        success: true,
        filename: photo.originalname,
        mimeType: photo.mimetype,
        size: photo.size,
      };
    } catch (err) {
      console.error('Error in test endpoint:', err.message);
      throw new HttpException(
        `File upload failed: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
