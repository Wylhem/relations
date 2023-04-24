import { Injectable } from '@nestjs/common';
import { VideoDto } from './dto/video.dto';
import { PrismaService } from "../prisma/prisma.service";
import { FileEntity } from "../picture/entity/file.entity";
import { VideoEntity } from "./entities/video.entity";

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(video: FileEntity): Promise<VideoEntity> {
    return await this.prisma.video.create({
      data: {
        vdo_name: video.filename,
        vdo_path: video.path,
        vdo_size: video.size,
        vdo_type: video.mimetype,
      },
    });
  }

  public async getAll() {
    return await this.prisma.video.findMany();
  }
}
