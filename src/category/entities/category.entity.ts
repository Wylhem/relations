import { category } from '@prisma/client';

export class CategoryEntity implements category {
  ctg_id: string;
  ctg_label: string;
  ctg_createdAt: Date;
  ctg_updatedAt: Date;
}
