import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, '../public/chat-img/hd-shop-front.jpg');

async function cropImages() {
  try {
    const metadata = await sharp(inputPath).metadata();
    const height = metadata.height;
    const width = metadata.width;

    const thirdHeight = Math.floor(height / 3);

    console.log(`Original image: ${width}x${height}. Splitting into 3 parts of roughly ${width}x${thirdHeight}`);

    // Crop Top
    await sharp(inputPath)
      .extract({ left: 0, top: 0, width: width, height: thirdHeight - 10 })
      .toFile(path.resolve(__dirname, '../public/chat-img/hd-shop-front-top.jpg'));
    console.log('Top image cropped.');

    // Crop Middle
    await sharp(inputPath)
      .extract({ left: 0, top: thirdHeight + 5, width: width, height: thirdHeight - 15 })
      .toFile(path.resolve(__dirname, '../public/chat-img/hd-shop-front-middle.jpg'));
    console.log('Middle image cropped.');

    // Crop Bottom
    await sharp(inputPath)
      .extract({ left: 0, top: (thirdHeight * 2) + 5, width: width, height: thirdHeight - 15 })
      .toFile(path.resolve(__dirname, '../public/chat-img/hd-shop-front-bottom.jpg'));
    console.log('Bottom image cropped.');

    console.log('Successfully cropped all images!');
  } catch (error) {
    console.error('Error cropping image:', error);
  }
}

cropImages();
