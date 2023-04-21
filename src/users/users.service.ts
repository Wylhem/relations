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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
