import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';
import { LikeCommentDto } from './dto/like-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikeCommentEntity } from './entities/like-comment.entity';

@ApiBearerAuth()
@ApiTags('LikeComment')
@Controller('like-comment')
export class LikeCommentController {
  constructor(private readonly likeCommentService: LikeCommentService) {}

  /**
   * Get all liked posts
   */
  @Get()
  public async getAll(): Promise<Array<LikeCommentDto>> {
    const likePosts: Array<LikeCommentEntity> =
      await this.likeCommentService.getAll();
    return likePosts.map((likePosts) => LikeCommentDto.Load(likePosts));
  }

  /**
   * Gets a specific posts
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<LikeCommentDto> {
    const likePost: LikeCommentEntity = await this.likeCommentService.getOne(
      id,
    );
    return LikeCommentDto.Load(likePost);
  }

  /**
   * Cout number of likes from specific comment
   * @param id
   */
  @Get(':id/count')
  public async countNumberOfLikes(@Param('id') id: string) {
    return await this.likeCommentService.countLikeComment(id);
  }
  /*
   * Create new post
   * @param likePostDto PostDto
   */
  @Post()
  public async create(
    @Body() likePostDto: LikeCommentDto,
  ): Promise<LikeCommentDto> {
    const likePost: LikeCommentEntity = await this.likeCommentService.create(
      likePostDto,
    );
    return LikeCommentDto.Load(likePost);
  }

  /**
   * Delete a post
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const post: LikeCommentEntity = await this.likeCommentService.delete(id);
    return post.lkc_id;
  }
}
