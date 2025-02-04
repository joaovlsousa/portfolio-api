import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { EnvService } from '@/env/env.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService
  ) {}

  async authenticateWithGithub(code: string) {
    const accessTokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.envService.get('GITHUB_OAUTH_CLIENT_ID'),
          client_secret: this.envService.get('GITHUB_OAUTH_CLIENT_SECRET'),
          redirect_uri: this.envService.get('GITHUB_OAUTH_CLIENT_REDIRECT_URI'),
          code,
        }),
      }
    )

    const { access_token: githubAccessToken } = await accessTokenResponse.json()

    const userDataResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: 'application/json',
      },
    })

    const { id: githubId, login: username } = await userDataResponse.json()

    const isValidUser =
      githubId === this.envService.get('GITHUB_USER_ID') &&
      username === this.envService.get('GITHUB_USERNAME')

    if (!isValidUser) {
      throw new UnauthorizedException(
        'Você não tem permissão para accessar o app'
      )
    }

    return {
      accesToken: this.jwtService.sign({ sub: githubId }),
    }
  }
}
