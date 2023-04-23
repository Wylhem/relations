import { follow } from "@prisma/client";
import { Person } from "../../person/entity/person.entitiy";

export class FollowEntity implements follow {
    flw_id: string;
    flw_followers: string;
    flw_following: string;
    flw_createdAt: Date;
    flw_updatedAt: Date;

    followers?: Person;
    following?: Person;
}
