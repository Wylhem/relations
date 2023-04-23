import { comment } from '@prisma/client';
import { Person } from "../../person/entity/person.entitiy";


export class Comment implements comment{
    cmt_id: string;
    cmt_text: string;
    cmt_createdAt: Date;
    cmt_updatedAt: Date;
    cmt_person: string;
    cmt_comment: string;

    person?: Person;
}
