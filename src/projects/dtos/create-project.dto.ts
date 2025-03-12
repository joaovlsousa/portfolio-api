import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength
} from 'class-validator'

type ProjectType = 'FRONTEND' | 'BACKEND'

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
  type: ProjectType
}
