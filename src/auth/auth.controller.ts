import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AST } from 'eslint';
import Token = AST.Token;
import { Tokens } from './types/tokens.dto';
import { PublicDecorator } from '../shared/decorator/public.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register new Account
   * @param registerDto
   */
  @Post()
  @PublicDecorator()
  public async register(@Body() registerDto: RegisterDto): Promise<Tokens> {
    if (!registerDto) {
      throw new BadRequestException();
    }
    return await this.authService.register(registerDto);
  }

  /**
   * Login an Existent users
   */
  @PublicDecorator()
  @Post('/login')
  public async login(@Body() authDto: AuthDto): Promise<Tokens> {
    if (!authDto) {
      throw new BadRequestException();
    }
    return await this.authService.login(authDto);
  }
}
