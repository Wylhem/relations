import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Hashed password
   * @param password String
   * @private
   */
  private async hashData(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Generate new tokens
   * @param userId string
   * @param email string
   * @private
   */
  private async generateToken(userId: string, email: string): Promise<Tokens> {
    const expiresIn = 60 * 60;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.SECRET_TOKEN,
          expiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN,
          expiresIn,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
      duration: expiresIn,
    };
  }
  private async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prismaService.users.update({
      where: {
        usr_id: userId,
      },
      data: {
        usr_refreshToken: rt,
      },
    });
  }
  public async register(registerDto: RegisterDto): Promise<Tokens> {
    const password: string = await this.hashData(registerDto.password);
    const user = await this.prismaService.users.create({
      data: {
        usr_username: registerDto.username,
        usr_email: registerDto.email,
        usr_password: password,
      },
    });

    return await this.generateToken(user.usr_id, user.usr_email);
  }

  public async login(authDto: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.users.findUnique({
      where: {
        usr_email: authDto.email,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const passwordMatches = await bcrypt.compare(
      authDto.password,
      user.usr_password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Access Diened');
    }
    const tokens = await this.generateToken(user.usr_id, user.usr_email);
    await this.updateRtHash(user.usr_id, tokens.refresh_token);
    return tokens;
  }
}
