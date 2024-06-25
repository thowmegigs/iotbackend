import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class MakeService {
  async copyFolder(sourcePath: string, destinationPath: string): Promise<void> {
    try {
      await fs.copy(sourcePath, destinationPath);
      console.log('Folder copied successfully!');
    } catch (err) {
      console.error('Error copying folder:', err);
      throw err;
    }
  }
}