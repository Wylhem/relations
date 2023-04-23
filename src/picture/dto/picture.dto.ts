import { BaseDto } from '../../shared/base/base.dto';
import { FileEntity } from '../entity/file.entity';
import { PictureEntity } from '../entity/picture.entity';

export class PictureDto extends BaseDto {
  name: string;
  path: string;
  size: number;
  type: string;

  public static Load(file: PictureEntity): PictureDto {
    return {
      id: file.pct_id,
      name: file.pct_name,
      path: file.pct_path,
      size: file.pct_size,
      type: file.pct_type,
      createdAt: file.pct_createdAt,
      updatedAt: file.pct_updatedAt,
    };
  }
}
