import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { FileDto } from '../upload/upload.dto'
import { UploadService } from '../upload/upload.service'
import { CreateProjectDto } from './dtos/create-project.dto'
import { UpdateProjectDto } from './dtos/update-project.dto'
import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly uploadService: UploadService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProject(@Body() project: CreateProjectDto) {
    return await this.projectService.create(project)
  }

  @Patch(':id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProjectImage(
    @UploadedFile() file: FileDto,
    @Param('id') projectId: string
  ) {
    const { imageId, imageUrl } = await this.uploadService.uploadFile(file)

    const project = await this.projectService.findById(projectId)

    if (project.imageId) {
      await this.uploadService.deleteFile(project.imageId)
    }

    await this.projectService.updateImage({ imageId, imageUrl, projectId })
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProject(
    @Body() projectData: UpdateProjectDto,
    @Param('id') projectId: string
  ) {
    await this.projectService.update(projectData, projectId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProject(@Param('id') projectId: string) {
    const project = await this.projectService.findById(projectId)

    if (project.imageId) {
      await this.uploadService.deleteFile(project.imageId)
    }

    await this.projectService.delete(projectId)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProjects() {
    const projects = await this.projectService.getAll()

    return {
      projects,
    }
  }

  @Get('pinned')
  @HttpCode(HttpStatus.OK)
  async getPinnedProjects() {
    const projects = await this.projectService.getPinned()

    return {
      projects,
    }
  }
}
