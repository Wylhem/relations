import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsDefined } from 'class-validator';

export class RegisterDto extends PartialType(AuthDto) {
  /**
   * Gets or sets username.
   */
  @IsDefined()
  username: string;
}
