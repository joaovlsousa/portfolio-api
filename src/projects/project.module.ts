import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { UploadModule } from '../upload/upload.module'
import { UploadService } from '../upload/upload.service'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
  imports: [PrismaModule, UploadModule, EnvModule, AuthModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, UploadService, EnvService],
})
export class ProjectModule {}
