import { Express } from 'express';
import { Readable } from 'stream';

export class FileEntity implements Express.Multer.File {
  /**
   * Gets or sets fiedlname
   */
  fieldname: string;
  /**
   * Gets or sets originalname
   */
  originalname: string;
  /**
   * Get or sets encoding
   */
  encoding: string;
  /**
   * Get or sets encoding
   */
  mimetype: string;
  /**
   * get or sets size
   */
  size: number;
  /**
   * Get or set stream
   */
  stream: Readable;
  /**
   * Gets or sets destination
   */
  destination: string;
  /**
   * Gets or sets filename
   */
  filename: string;
  /**
   * Gets or sets path
   */
  path: string;
  /**
   * Gets or sets buffer
   */
  buffer: Buffer;
}
