import { IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateWithGithubDto {
  @IsString()
  @IsNotEmpty()
  code: string
}
