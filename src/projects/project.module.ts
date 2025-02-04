import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { EnvModule } from 'src/env/env.module'
import { EnvService } from 'src/env/env.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadModule } from 'src/upload/upload.module'
import { UploadService } from 'src/upload/upload.service'

import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
  imports: [PrismaModule, UploadModule, EnvModule, AuthModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, UploadService, EnvService],
})
export class ProjectModule {}
