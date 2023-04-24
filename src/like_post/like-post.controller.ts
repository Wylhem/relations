import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { LikePostDto } from './dto/like-post.dto';
import { LikePostEntity } from './entities/like-post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('LikePost')
@Controller('like_post')
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}

  /**
   * Get all liked posts
   */
  @Get()
  public async getAll(): Promise<Array<LikePostDto>> {
    const likePosts: Array<LikePostEntity> =
      await this.likePostService.getAll();
    return likePosts.map((likePosts) => LikePostDto.Load(likePosts));
  }

  /**
   * Gets a specific posts
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<LikePostDto> {
    const likePost: LikePostEntity = await this.likePostService.getOne(id);
    return LikePostDto.Load(likePost);
  }

  /**
   * Create new post
   * @param likePostDto PostDto
   */
  @Post()
  public async create(@Body() likePostDto: LikePostDto): Promise<LikePostDto> {
    const likePost: LikePostEntity = await this.likePostService.create(
      likePostDto,
    );
    return LikePostDto.Load(likePost);
  }

  /**
   * Count number of like of specific posts.
   * @param id
   */
  @Get(':id/count')
  public async countNumberLikedPosts(@Param('id') id: string): Promise<number> {
    return await this.likePostService.countLikePost(id);
  }
  /**
   * Delete a post
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const post: LikePostEntity = await this.likePostService.delete(id);
    return post.lkp_id;
  }
}
