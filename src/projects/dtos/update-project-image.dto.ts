import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class UpdateProjectImageDto {
  @IsString()
  @IsNotEmpty()
  projectId: string

  @IsString()
  @IsNotEmpty()
  imageId: string

  @IsUrl()
  imageUrl: string
}
