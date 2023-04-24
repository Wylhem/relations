import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowDto } from './dto/follow.dto';
import { Follow } from './entity/follow.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Follow')
@ApiBearerAuth()
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  /**
   * Gets all Relation
   */
  @Get()
  public async getAll(): Promise<Array<FollowDto>> {
    const follows: Array<Follow> = await this.followService.getAll();
    return follows.map((follow) => FollowDto.Load(follow));
  }

  /**
   * Create new Relation
   * @param followDto
   */
  @Post()
  public async create(@Body() followDto: FollowDto): Promise<FollowDto> {
    if (!followDto) {
      throw new BadRequestException();
    }
    const follow: Follow = await this.followService.create(followDto);
    return FollowDto.Load(follow);
  }
}
