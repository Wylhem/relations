import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class RegisterDto extends PartialType(AuthDto) {
  /**
   * Gets or sets username.
   */
  username: string;
}
