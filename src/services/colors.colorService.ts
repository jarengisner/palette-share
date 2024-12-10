//color picker from images
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import * as getColors from 'get-image-colors';

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
  async extractColorFileUpload(file: any): Promise<any> {
    try {
      if (!file) {
        throw new HttpException(
          'No file included in package',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.log(file);

      console.log(file.buffer);
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


  async extractColorTest(photo: any): Promise<any> {
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

  async extractColorURL() {}
}
