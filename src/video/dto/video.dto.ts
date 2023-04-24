import { VideoEntity } from "../entities/video.entity";
import { BaseDto } from "../../shared/base/base.dto";

export class VideoDto extends BaseDto {
  name: string;
  path: string;
  size: number;
  type: string;

  public static Load(file: VideoEntity): VideoDto {
    return {
      id: file.vdo_id,
      name: file.vdo_name,
      path: file.vdo_path,
      size: file.vdo_size,
      type: file.vdo_type,
      createdAt: file.vdo_createdAt,
      updatedAt: file.vdo_updatedAt,
    }
  }
}
