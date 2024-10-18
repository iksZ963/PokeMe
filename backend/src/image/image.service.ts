import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class ImageService {
  async transformImage(file: Express.Multer.File): Promise<any> {
    try {
      // Convert the uploaded image file to base64
      const base64Image = file.buffer.toString('base64');

      // Prepare the request payload with the base64-encoded image and the prompt
      const payload = {
        inputs: {
          image: base64Image, // Use 'image' field here instead of including prompt
        },
        parameters: {
          prompt: 'anime style', // Define the prompt for the image transformation
        },
        options: {
          wait_for_model: true, // Wait for the model if it's not already loaded
        },
      };

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', // img2img model endpoint
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.Hf_API_TOKEN}`, // Hugging Face token
            'Content-Type': 'application/json', // Sending JSON
          },
          responseType: 'arraybuffer', // To handle the image data in the response
        },
      );

      // Check if the response contains an image
      const mimeType = response.headers['content-type'];
      const result = response.data;

      if (!mimeType.startsWith('image/')) {
        const errorMsg = Buffer.from(result).toString('utf8');
        console.error('API returned an error message:', errorMsg);
        throw new HttpException(`API error: ${errorMsg}`, 500);
      }

      // Convert the result to base64
      const base64data = Buffer.from(result).toString('base64');
      const img = `data:${mimeType};base64,${base64data}`;

      return img; // Return the base64 encoded image
    } catch (error) {
      // Log the error message
      const errorMessage = error.response?.data
        ? Buffer.from(error.response.data).toString('utf8')
        : error.message;
      console.error('Error calling Hugging Face API:', errorMessage);
      throw new HttpException(`Error transforming image: ${errorMessage}`, 500);
    }
  }
}
