import { $Enums as PrismaEnums } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength
} from 'class-validator'

export class CreateProjectDto {
  @MinLength(2)
  name: string

  @MinLength(10)
  description: string

  @IsUrl()
  githubUrl: string

  @IsUrl()
  @IsOptional()
  deployUrl: string | undefined

  @IsOptional()
  pinned: boolean | undefined

  @IsNotEmpty()
  @IsEnum(PrismaEnums.ProjectType)
  type: PrismaEnums.ProjectType
}
