import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictureDto } from './dto/picture.dto';
import { PictureEntity } from './entity/picture.entity';
import { FileEntity } from './entity/file.entity';

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(picture: FileEntity): Promise<PictureEntity> {
    return await this.prisma.picture.create({
      data: {
        pct_name: picture.filename,
        pct_path: picture.path,
        pct_size: picture.size,
        pct_type: picture.mimetype,
      },
    });
  }

  public async getAll() {
    return await this.prisma.picture.findMany();
  }
}
