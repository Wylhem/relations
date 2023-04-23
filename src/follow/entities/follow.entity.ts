import { follow } from '@prisma/client';

export class FollowEntity implements follow {
    flw_id: string;
    flw_followers: string;
    flw_following: string;
    flw_createdAt: Date;
    flw_updatedAt: Date;
    
}
