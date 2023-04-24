import { Controller, Get, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { VideoService } from './video.service';
import { VideoDto } from './dto/video.dto';

import { FileFunction } from "../shared/function";
import { ApiConsumes } from "@nestjs/swagger";
import { ApiFile } from "../shared/decorator/api_file.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

import { FileEntity } from "../picture/entity/file.entity";
import { VideoEntity } from "./entities/video.entity";
import { multerOptions } from "./multerUpload.config";

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}



  /**
   * Get All Videos
   */
  @Get()
  public async getAll(): Promise<Array<VideoDto>> {
    const videos: Array<VideoEntity> = await this.videoService.getAll();
    videos.forEach((video) => {
      video.vdo_path = FileFunction.GenerateFile(video.vdo_path);
    });
    return videos.map((video) => VideoDto.Load(video));
  }

  /**
   * Upload a video
   * @param file
   */
  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', multerOptions))
  public async uploadFile(
    @UploadedFile() file: FileEntity,
  ): Promise<VideoDto> {
    const fileEntity = await this.videoService.create(file);
    return VideoDto.Load(fileEntity);
  }
}
