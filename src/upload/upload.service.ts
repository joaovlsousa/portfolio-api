import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { EnvService } from 'src/env/env.service'
import { UTApi, UTFile } from 'uploadthing/server'

import { FileDto } from './upload.dto'

@Injectable()
export class UploadService {
  private readonly uploadthingApi: UTApi

  constructor(private readonly env: EnvService) {
    this.uploadthingApi = new UTApi({
      token: env.get('UPLOADTHING_TOKEN'),
    })
  }

  async uploadFile(file: FileDto) {
    const fileToUpload = new UTFile([file.buffer], file.originalname)

    const { data, error } = await this.uploadthingApi.uploadFiles(fileToUpload)

    if (error) {
      throw new BadRequestException(error.message)
    }

    return {
      imageId: data.key,
      imageUrl: data.url,
    }
  }

  async deleteFile(fileId: string) {
    const { success } = await this.uploadthingApi.deleteFiles(fileId)

    if (!success) {
      throw new InternalServerErrorException(
        'Não foi possível alterar a imagem do projeto.'
      )
    }
  }
}
