import { picture } from '@prisma/client';

export class PictureEntity implements picture {
  pct_id: string;
  pct_name: string;
  pct_path: string;
  pct_size: number;
  pct_type: string;
  pct_createdAt: Date;
  pct_updatedAt: Date;
}
