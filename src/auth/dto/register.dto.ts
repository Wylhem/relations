import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto extends PartialType(AuthDto) {
  /**
   * Gets or sets username.
   */
  @IsNotEmpty()
  username: string;
}
