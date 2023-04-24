import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Person } from './entity/person.entitiy';
import { PersonDto } from './dto/person.dto';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}
  public async getAll(): Promise<Array<Person>> {
    return await this.prisma.person.findMany({
      include: {
        users: true,
      },
    });
  }

  public async getOne(id: string): Promise<Person> {
    return await this.prisma.person.findFirst({
      where: {
        per_id: id,
      },
      include: {
        users: true,
      },
    });
  }

  /**
   * Get All Post From a person
   * @param id PersonId
   */
  public async getAllFromPerson(id: string) {
    return await this.prisma.person.findFirst({
      where: {
        per_id: id,
      },
      include: {
        posts: true,
      },
    });
  }

  /**
   * Get All LikePost From a person
   * @param id PersonId
   */
  public async getAllLikePostFromPerson(id: string): Promise<Person> {
    return await this.prisma.person.findFirst({
      where: {
        per_id: id,
      },
      include: {
        like_post: true,
      },
    });
  }

  /**
   * Get All Like Comment From a person
   * @param id PersonId
   */
  public async getAllLikeCommentFromPerson(id: string) {
    return await this.prisma.person.findFirst({
      where: {
        per_id: id,
      },
      include: {
        like_comment: true,
      },
    });
  }

  /**
   * Get All Comment From a person
   * @param id PersonId
   */
  public async getAllCommentFromPerson(id: string) {
    return await this.prisma.person.findFirst({
      where: {
        per_id: id,
      },
      include: {
        comments: true,
      },
    });
  }

  public async create(personDto: PersonDto): Promise<Person> {
    return await this.prisma.person.create({
      data: {
        per_firstname: personDto.firstname,
        per_lastname: personDto.lastname,
        per_civility: personDto.civility,
      },
    });
  }

  public async connect(personDto: PersonDto): Promise<Person> {
    return await this.prisma.person.update({
      where: {
        per_id: personDto.id,
      },
      data: {
        users: {
          connect: {
            usr_id: personDto.users.id,
          },
        },
      },
      include: {
        users: true,
      },
    });
  }

  public async update(personDto: PersonDto): Promise<Person> {
    return await this.prisma.person.update({
      where: {
        per_id: personDto.id,
      },
      data: {
        per_firstname: personDto.firstname,
        per_lastname: personDto.lastname,
        per_civility: personDto.civility,
      },
      include: {
        users: true,
      },
    });
  }

  public async delete(id: string): Promise<Person> {
    return await this.prisma.person.delete({
      where: {
        per_id: id,
      },
    });
  }
}
