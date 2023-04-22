import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Person } from './entity/person.entitiy';
import { PersonDto } from './dto/person.dto';

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
