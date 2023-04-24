import { Module } from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { LikePostController } from './like-post.controller';

@Module({
  controllers: [LikePostController],
  providers: [LikePostService]
})
export class LikePostModule {}
