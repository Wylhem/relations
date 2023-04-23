import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from './entity/file.entity';

import { ApiFile } from '../shared/decorator/api_file.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PictureDto } from './dto/picture.dto';
import { PictureEntity } from './entity/picture.entity';
import { FileFunction } from '../shared/function';

@ApiBearerAuth()
@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  /**
   * Get All Pictures
   */
  @Get()
  public async getAll(): Promise<Array<PictureDto>> {
    const pictures: Array<PictureEntity> = await this.pictureService.getAll();
    pictures.forEach((picture) => {
      picture.pct_path = FileFunction.GenerateFile(picture.pct_path);
    });
    return pictures.map((picture) => PictureDto.Load(picture));
  }

  /**
   * Upload an image
   * @param file
   */
  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  public async uploadFile(
    @UploadedFile() file: FileEntity,
  ): Promise<PictureDto> {
    const fileEntity = await this.pictureService.create(file);
    return PictureDto.Load(fileEntity);
  }
}
