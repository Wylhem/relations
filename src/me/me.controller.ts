import {
  BadRequestException,
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
import { Follow } from '../follow/entity/follow.entity';
import { FollowService } from '../follow/follow.service';
import { FollowDto } from '../follow/dto/follow.dto';
import { NewFollowDto } from '../follow/dto/new-follow.dto';
import { UserDto } from '../users/dto/user.dto';
import { LikePostDto } from '../like_post/dto/like-post.dto';
import { LikePostEntity } from '../like_post/entities/like-post.entity';
import { LikePostService } from '../like_post/like-post.service';
import { LikeCommentDto } from "../like-comment/dto/like-comment.dto";
import { LikeCommentEntity } from "../like-comment/entities/like-comment.entity";
import { LikeCommentService } from "../like-comment/like-comment.service";

@ApiBearerAuth()
@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private readonly postService: PostService,
    private readonly personService: PersonService,
    private readonly userService: UsersService,
    private readonly likePostService: LikePostService,
    private readonly likeCommentService: LikeCommentService,
    private readonly followService: FollowService,
  ) {}

  /**
   * Get my profile
   * @param id
   */
  @Get()
  public async getMe(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const person = await this.personService.getOne(user.person.per_id);
    return PersonDto.Load(person);
  }

  /**
   * Upsert my profile
   */
  @Post()
  public async upsertMyProfile(
    @GetCurrentUserId() id: string,
    @Body() personDto: PersonDto,
  ): Promise<UserDto> {
    if (!personDto) {
      throw new BadRequestException();
    }
    const users: Users = await this.userService.upsertMyProfile(id, personDto);
    if (!users) {
      throw new BadRequestException();
    }
    return UserDto.Load(users);
  }

  /**
   * Get All my  posts
   * @param id
   */
  @Get('/posts')
  public async getMyPosts(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
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
  public async getMyLikePosts(
    @GetCurrentUserId() id: string,
  ): Promise<PersonDto> {
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
   * Get All my like comment
   * @param id
   */
  @Get('/likeComments')
  public async getMyLikeComments(@GetCurrentUserId() id: string): Promise<PersonDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const person: Person = await this.personService.getAllLikeCommentFromPerson(
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
    if (!user.person) {
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
  public async createNewLikeComment(
    @GetCurrentUserId() id: string,
    @Body() likeCommentDto: LikeCommentDto,
  ): Promise<LikeCommentDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    const likeComment: LikeCommentEntity =
      await this.likeCommentService.createNewLikeCommentFromPerson(
        likeCommentDto.comment.id,
        user.person.per_id,
      );
    return LikeCommentDto.Load(likeComment);
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
    );
    return LikePostDto.Load(likePost);
  }

  /**
   * Gets all my followers
   * @param id
   */
  @Get('/followers')
  public async getMyFollowers(
    @GetCurrentUserId() id: string,
  ): Promise<Array<FollowDto>> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const followers: Array<Follow> = await this.followService.getAllFollowers(
      user.person.per_id,
    );
    return followers.map((follower) => FollowDto.Load(follower));
  }

  /**
   * Gets all mu follow
   * @param id
   */
  @Get('/following')
  public async getMyFollow(
    @GetCurrentUserId() id: string,
  ): Promise<Array<FollowDto>> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const following: Array<Follow> = await this.followService.getAllFollowings(
      user.person.per_id,
    );
    return following.map((follower) => FollowDto.Load(follower));
  }

  /**
   * Follow new person
   * @param id
   * @param followDto
   */
  @Post('/following')
  public async follow(
    @GetCurrentUserId() id: string,
    @Body() followDto: NewFollowDto,
  ) {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const follow: Follow = await this.followService.createFromPerson(
      id,
      followDto,
    );
    return FollowDto.Load(follow);
  }
}
