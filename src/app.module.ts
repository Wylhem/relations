import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards/at.guard';
import { PostModule } from './post/post.module';
import { MeModule } from './me/me.module';
import { LikePostModule } from './like_post/like-post.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { PictureModule } from './picture/picture.module';
import { FollowModule } from './follow/follow.module';
import { LikeCommentModule } from './like-comment/like-comment.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PersonModule,
    PostModule,
    MeModule,
    CategoryModule,
    CommentModule,
    PictureModule,
    LikePostModule,
    FollowModule,
    PostCategoryModule,
    LikeCommentModule,
    VideoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
