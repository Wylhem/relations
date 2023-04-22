import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { PostService } from '../post/post.service';
import { PersonService } from '../person/person.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [MeController],
  providers: [MeService, PostService, PersonService, UsersService],
})
export class MeModule {}
