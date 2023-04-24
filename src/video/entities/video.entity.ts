import { video } from '@prisma/client';

export class VideoEntity implements video{
    vdo_id: string;
    vdo_name: string;
    vdo_path: string;
    vdo_size: number;
    vdo_type: string;
    vdo_createdAt: Date;
    vdo_updatedAt: Date;
}
