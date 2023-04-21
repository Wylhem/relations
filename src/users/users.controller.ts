import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get All Users
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get All Users By Id
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update Users
   * @param id
   * @param updateUserDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete one users
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
