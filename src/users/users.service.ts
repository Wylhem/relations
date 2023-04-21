import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: UserDto): Promise<Users> {
    return await this.prismaService.users.create({
      data: {
        usr_email: userDto.email,
        usr_username: userDto.username,
        usr_password: userDto.password,
      },
    });
  }

  public async getAll(): Promise<Array<Users>> {
    return await this.prismaService.users.findMany();
  }

  public async getOne(id: string): Promise<Users> {
    return await this.prismaService.users.findFirst({
      where: {
        usr_id: id,
      },
    });
  }

  public async update(id: string, userDto: UserDto) {
    return await this.prismaService.users.update({
      where: {
        usr_id: id,
      },
      data: {
        usr_email: userDto.email,
        usr_username: userDto.username,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.users.delete({
      where: {
        usr_id: id,
      },
    });
  }
}
