import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { MeService } from './me.service';
import { PostService } from '../post/post.service';
import { PersonDto } from '../person/dto/person.dto';
import { GetCurrentUserId } from '../shared/decorator/get.current.userId.decorator';
import { PersonService } from '../person/person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Person } from '../person/entity/person.entitiy';
import { PostDto } from '../post/dto/post.dto';
import { PostEntity } from '../post/entity/post.entity';
import { UsersService } from '../users/users.service';
import { Users } from '../users/entities/user.entity';
import { LikePostDto } from "../like_post/dto/like-post.dto";
import { LikePostEntity } from "../like_post/entities/like-post.entity";
import { LikePostService } from "../like_post/like-post.service";

@ApiBearerAuth()
@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private readonly postService: PostService,
    private readonly personService: PersonService,
    private readonly userService: UsersService,
    private readonly likePostService: LikePostService
  ) {}

  @Get()
  public async getMe(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const person = await this.personService.getOne(user.person.per_id);
    return PersonDto.Load(person);
  }

  /**
   * Get All my  posts
   * @param id
   */
  @Get('/posts')
  public async getMyPosts(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const person: Person = await this.personService.getAllFromPerson(
      user.person.per_id,
    );
    return PersonDto.Load(person);
  }

  /**
   * Get All my like post
   * @param id
   */
  @Get('/likePosts')
  public async getMyLikePosts(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const person: Person = await this.personService.getAllLikePostFromPerson(
      user.person.per_id,
    );
    return PersonDto.Load(person);
  }

  /**
   * Create A new post
   * @param id
   * @param postDto
   */
  @Post('/post')
  public async createNewPost(
    @GetCurrentUserId() id: string,
    @Body() postDto: PostDto,
  ): Promise<PostDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const post: PostEntity = await this.postService.createNewPostFromPerson(
      user.person.per_id,
      postDto,
    );
    return PostDto.Load(post);
  }

  /**
   * Create A new like post
   * @param id
   * @param likePostDto
   */
  @Post('/likePost')
  public async createNewLikePost(
    @GetCurrentUserId() id: string,
    @Body() likePostDto: LikePostDto,
  ): Promise<LikePostDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const likePost: LikePostEntity = await this.likePostService.createNewLikePostFromPerson(
      likePostDto.post.id,
      user.person.per_id,
      likePostDto,
    );
    return LikePostDto.Load(likePost);
  }
}
