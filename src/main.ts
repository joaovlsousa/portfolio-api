import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const env = app.get(EnvService)

  const cmsPublicUrl = env.get('CMS_PUBLIC_URL')
  const portfolioPublicUrl = env.get('PORTFOLIO_PUBLIC_URL')

  app.enableCors({
    origin: [cmsPublicUrl, portfolioPublicUrl],
  })
  app.useGlobalPipes(new ValidationPipe())

  const port = env.get('PORT')

  await app.listen(port)
}
bootstrap()
