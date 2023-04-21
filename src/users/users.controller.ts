import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
import { users } from '@prisma/client';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get All Users
   */
  @Get()
  public async getAll(): Promise<Array<UserDto>> {
    const users: Array<Users> = await this.usersService.getAll();
    return users.map((user) => UserDto.Load(user));
  }

  /**
   * Get All Users By id
   * @param id
   */
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const user: Users = await this.usersService.getOne(id);
    return UserDto.Load(user);
  }

  /**
   * Update Users
   * @param id
   * @param userDto
   */
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    const user: Users = await this.usersService.update(id, userDto);
    return UserDto.Load(user);
  }

  /**
   * Delete one users
   * @param id
   */
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<boolean> {
    const user = await this.usersService.remove(id);
    return user != null;
  }
}
