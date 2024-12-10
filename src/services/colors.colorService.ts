//color picker from images
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as getColors from 'get-image-colors';

import Palette from '../types/Palette';
import ImageFile from 'src/types/ImageFile';

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
  async extractColorFileUpload(file: ImageFile): Promise<Palette> {
    try {
      if (!file) {
        throw new HttpException(
          'No file included in package',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
        throw new HttpException(
          'File type not supported by application',
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }

      console.log(file);
      console.log(file.mimetype);

      const palette = await getColors(file.buffer, file.mimetype);

      return { palette: palette.map((color) => color.hex()) }; // Convert colors to hex if needed
    } catch (err) {
      throw new HttpException(
        `Error within file upload: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async extractColorURL() {}
}
