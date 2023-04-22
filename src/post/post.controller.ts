import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './entity/post.entity';
import { PostDto } from './dto/post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Get all posts
   */
  @Get()
  public async getAll(): Promise<Array<PostDto>> {
    const posts: Array<PostEntity> = await this.postService.getAll();
    return posts.map((posts) => PostDto.Load(posts));
  }

  /**
   * Gets a specific posts
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<PostDto> {
    const post: PostEntity = await this.postService.getOne(id);
    return PostDto.Load(post);
  }

  /**
   * Create new post
   * @param postDto PostDto
   */
  @Post()
  public async create(@Body() postDto: PostDto): Promise<PostDto> {
    const post: PostEntity = await this.postService.create(postDto);
    return PostDto.Load(post);
  }

  /**
   * Delete a post
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const post: PostEntity = await this.postService.delete(id);
    return post.pst_id;
  }
}
