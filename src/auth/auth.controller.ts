import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthenticateWithGithubDto } from './dtos/authenticate-with-github.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github')
  async AuthenticateWithGithub(@Body() { code }: AuthenticateWithGithubDto) {
    return await this.authService.authenticateWithGithub(code)
  }
}
