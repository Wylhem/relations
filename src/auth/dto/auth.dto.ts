import { IsEmail, IsString, NotEquals } from 'class-validator';

export class AuthDto {
  /**
   * Gets or sets email.
   */
  @IsEmail()
  @IsString()
  @NotEquals(null)
  email: string;

  /**
   * Gets or sets password.
   */
  @IsString()
  @NotEquals(null)
  password: string;
}
