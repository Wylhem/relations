import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Person } from './entity/person.entitiy';
import { PersonDto } from './dto/person.dto';
import { LikePostEntity } from '../like_post/entities/like-post.entity';
import { LikePostDto } from '../like_post/dto/like-post.dto';
import { LikeCommentDto } from '../like-comment/dto/like-comment.dto';
import { LikeCommentService } from '../like-comment/like-comment.service';
import { LikePostService } from '../like_post/like-post.service';

@ApiBearerAuth()
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly likeCommentService: LikeCommentService,
    private readonly likesPostService: LikePostService,
  ) {}

  /**
   * Get All Persons.
   */
  @Get()
  public async getAll(): Promise<Array<PersonDto>> {
    const persons: Array<Person> = await this.personService.getAll();
    return persons.map((person) => PersonDto.Load(person));
  }

  /**
   * Get One persons with specific id.
   * @param id
   * @constructor
   */
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<PersonDto> {
    const person: Person = await this.personService.getOne(id);
    if (!person) {
      throw new NotFoundException();
    }
    return PersonDto.Load(person);
  }

  /**
   * Gets All Liked Post from users
   *
   */
  @Get(':id/likePosts')
  public async getAllLikePosts(
    @Param('id') id: string,
  ): Promise<Array<LikePostDto>> {
    const likePost = await this.likesPostService.getAllFromPerson(id);
    if (!likePost) {
      throw new NotFoundException();
    }
    return likePost.map((likes) => LikePostDto.Load(likes));
  }

  /**
   * Gets All Liked Comments from users
   *
   */
  @Get(':id/likeComments')
  public async getAllLikeComments(
    @Param('id') id: string,
  ): Promise<Array<LikeCommentDto>> {
    const likesComment = await this.likeCommentService.getAllFromPerson(id);
    if (!likesComment) {
      throw new NotFoundException();
    }
    return likesComment.map((likeComment) => LikeCommentDto.Load(likeComment));
  }

  /**
   * Create new person
   * @param personDto
   */
  @Post()
  public async create(@Body() personDto: PersonDto): Promise<PersonDto> {
    if (!personDto) {
      throw new BadRequestException();
    }
    const person: Person = await this.personService.create(personDto);
    return PersonDto.Load(person);
  }

  /**
   * Connect new person to an existent users
   * @param personDto
   */
  @Patch('/users')
  public async connectUsers(@Body() personDto: PersonDto): Promise<PersonDto> {
    if (!personDto) {
      throw new BadRequestException();
    }
    const person: Person = await this.personService.connect(personDto);
    return PersonDto.Load(person);
  }

  /**
   * Update an existent person.
   * @param personDto
   */
  @Put()
  public async update(@Body() personDto: PersonDto): Promise<PersonDto> {
    if (!personDto) {
      throw new BadRequestException();
    }
    const person: Person = await this.personService.update(personDto);
    return PersonDto.Load(person);
  }

  /**
   * Delete an existent person
   * @param id
   */
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    const person: Person = await this.personService.delete(id);
    if (!person) {
      throw new NotFoundException();
    }
    return person.per_id;
  }
}
