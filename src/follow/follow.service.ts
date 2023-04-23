import { Injectable } from '@nestjs/common';
import { FollowDto } from './dto/follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Injectable()
export class FollowService {
  create(createFollowDto: FollowDto) {
    return 'This action adds a new follow';
  }

  findAll() {
    return `This action returns all follow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
