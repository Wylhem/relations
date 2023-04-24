import { Module } from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';
import { LikeCommentController } from './like-comment.controller';

@Module({
  controllers: [LikeCommentController],
  providers: [LikeCommentService]
})
export class LikeCommentModule {}
