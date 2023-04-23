import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowDto } from './dto/follow.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FollowEntity } from "./entities/follow.entity";

@ApiBearerAuth()
@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  /**
   * Get all follows
   */
  @Get()
  public async getAll(): Promise<Array<FollowDto>> {
    const follows: Array<FollowEntity> = await this.followService.getAll();
    return follows.map((follows) => FollowDto.Load(follows));
  }

  /**
   * Gets a specific follow
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<FollowDto> {
    const follow: FollowEntity = await this.followService.getOne(id);
    return FollowDto.Load(follow);
  }

  /**
   * Create new follow
   * @param postDto PostDto
   */
  @Post()
  public async create(@Body() followDto: FollowDto): Promise<FollowDto> {
    const follow: FollowEntity = await this.followService.create(followDto);
    return FollowDto.Load(follow);
  }

  /**
   * Delete a follow
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const follow: FollowEntity = await this.followService.delete(id);
    return follow.flw_id;
  }
}
