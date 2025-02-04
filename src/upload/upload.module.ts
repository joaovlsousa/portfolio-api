import { Module } from '@nestjs/common'
import { EnvModule } from 'src/env/env.module'
import { EnvService } from 'src/env/env.service'

import { UploadService } from './upload.service'

@Module({
  imports: [EnvModule],
  providers: [UploadService, EnvService],
  exports: [UploadService],
})
export class UploadModule {}
