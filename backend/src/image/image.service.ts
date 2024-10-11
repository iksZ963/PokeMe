import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express'; // Import Express types

@Injectable()
export class ImageService {
  async transformImage(file: Express.Multer.File) { // Use Express.Multer.File
    const imagePath = path.join(__dirname, '../../uploads', file.originalname);
    fs.writeFileSync(imagePath, file.buffer);

    const apiKey = process.env.DEEPAI_API_KEY; // Set your DeepAI API key in .env
    const response = await axios.post(
      'https://api.deepai.org/api/toonify',
      {
        image: fs.createReadStream(imagePath),
      },
      {
        headers: {
          'api-key': apiKey,
        },
      }
    );

    return response.data; // This will include the transformed image URL
  }
}
