//color picker from images
import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';

import { Express } from 'express';
import Vibrant from 'node-vibrant';

@Injectable()
export class ColorService {
  constructor() {}

  /**
   *
   * @param file - multer file type
   * @returns an object with the hex code of 4 prominent colors within the photo
   *
   * Issues:
   * Need to filter for only .img, .png, etc
   *
   */
  async extractColorFileUpload(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException(
          'No file included in package',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const path = file.path;

      const palette = await Vibrant.from(path).getPalette();

      const dominantColors = Object.values(palette)
        .filter((color) => color !== null)
        .sort((a, b) => b.population - a.population)
        .slice(0, 4)
        .map((color) => color.hex);

      return { dominantColors };
    } catch (err) {
      throw new HttpException(
        `Error within file upload: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async extractColorURL() {}
}
