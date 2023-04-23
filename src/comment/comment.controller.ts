import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Comment } from "./entities/comment.entity";

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CommentDto) {
    return this.commentService.create(createCommentDto);
  }

  /**
   * Get All Comment
   */
  @Get()
  public async getAll(): Promise<Array<CommentDto>> {
    const comments: Array<Comment> = await this.commentService.getAll();
    return comments.map((comments) => CommentDto.Load(comments));
  }

  /**
   * Get A Comment By id
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const comment: Comment = await this.commentService.getOne(id);
    return CommentDto.Load(comment);
  }

  /**
   * Update Comment
   * @param id
   * @param commentDto
   */
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
  ): Promise<CommentDto> {
    const comment: Comment = await this.commentService.update(id, commentDto);
    return CommentDto.Load(comment);
  }

  /**
   * Delete one comment
   * @param id
   */
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<string> {
    const comment = await this.commentService.remove(id);
    return comment.cmt_id;
  }
}
