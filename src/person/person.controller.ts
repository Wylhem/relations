import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Person } from './entity/person.entitiy';
import { PersonDto } from './dto/person.dto';
import { person } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

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
  public async GetOne(@Param('id') id: string): Promise<PersonDto> {
    const person: Person = await this.personService.getOne(id);
    return PersonDto.Load(person);
  }

  /**
   * Gets All Post from users
   * @constructor
   */
  @Get(':id/posts')
  public async GetAllPosts(@Param('id') id: string) {}

  /**
   * Gets All Post from users
   * @constructor
   */
  @Get(':id/likePosts')
  public async GetAllLikePosts(@Param('id') id: string) {

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
    return person.per_id;
  }
}
