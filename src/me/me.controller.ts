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
import { CHECK_SHARP } from '../shared/constants';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';
import { LikeCommentDto } from '../like-comment/dto/like-comment.dto';
import { LikeCommentEntity } from '../like-comment/entities/like-comment.entity';
import { LikeCommentService } from '../like-comment/like-comment.service';
import { like_comment } from '@prisma/client';
import { CommentDto } from '../comment/dto/comment.dto';
import * as http from 'http';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/entities/comment.entity';
import { use } from 'passport';
import { NewLikeDto } from '../like_post/dto/newLike.dto';
import { NewLikeCommentDto } from '../like-comment/dto/new-like-comment.dto';

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
    private readonly categoryService: CategoryService,
    private readonly commentService: CommentService,
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

    for (const post of person.posts) {
      post.nbLikes = await this.likePostService.countLikePost(post.pst_id);
    }
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
    if (!user.person) {
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
  public async getMyLikeComments(
    @GetCurrentUserId() id: string,
  ): Promise<Array<LikeCommentDto>> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const likesComments: Array<LikeCommentEntity> =
      await this.likeCommentService.getAllFromPerson(user.person.per_id);

    for (const likeComment of likesComments) {
      likeComment.nbLikes = await this.likeCommentService.countLikeComment(
        likeComment.lke_comment,
      );
    }
    return likesComments.map((likeComment) => LikeCommentDto.Load(likeComment));
  }

  /**
   * Create new Post
   * @param id
   * @param commentDto
   */
  @Post('/post/comment')
  public async createNewComment(
    @GetCurrentUserId() id: string,
    @Body() commentDto: CommentDto,
  ) {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }

    const comment = await this.commentService.createNewCommentFromPerson(
      user.person.per_id,
      commentDto,
    );
    if (!comment) {
      throw new BadRequestException();
    }
    return CommentDto.Load(comment);
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
    const categories: Array<string> = postDto.text.match(CHECK_SHARP);
    const post: PostEntity = await this.postService.createNewPostFromPerson(
      user.person.per_id,
      postDto,
      categories,
    );
    if (postDto?.picture?.id) {
      await this.postService.connectPicture(post.pst_id, postDto.picture.id);
    }
    const newPost = await this.postService.getOne(post.pst_id);
    return PostDto.Load(newPost);
  }

  /**
   * Create A new like post
   * @param id
   * @param likeCommentDto
   */
  @Post('/like/comment')
  public async createNewLikeComment(
    @GetCurrentUserId() id: string,
    @Body() likeCommentDto: NewLikeCommentDto,
  ): Promise<LikeCommentDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const likeComment: LikeCommentEntity =
      await this.likeCommentService.createNewLikeCommentFromPerson(
        likeCommentDto.comment,
        user.person.per_id,
      );
    return LikeCommentDto.Load(likeComment);
  }

  /**
   * Create A new like post
   * @param id
   * @param likePostDto
   */
  @Post('/like/post')
  public async createNewLikePost(
    @GetCurrentUserId() id: string,
    @Body() likePostDto: NewLikeDto,
  ): Promise<LikePostDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const likePost: LikePostEntity =
      await this.likePostService.createNewLikePostFromPerson(
        likePostDto.post,
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
    @Body() followDto: NewFollowDto,
    @GetCurrentUserId() id: string,
  ): Promise<FollowDto> {
    const user: Users = await this.userService.getOne(id);
    if (!user.person) {
      throw new ForbiddenException();
    }
    const follow: Follow = await this.followService.createFromPerson(
      user.person.per_id,
      followDto,
    );
    return FollowDto.Load(follow);
  }
}
