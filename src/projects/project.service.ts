// eslint-disable-next-line simple-import-sort/imports
import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectDto } from './dtos/create-project.dto'
import { UpdateProjectImageDto } from './dtos/update-project-image.dto'
import { UpdateProjectDto } from './dtos/update-project.dto'

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    deployUrl,
    description,
    githubUrl,
    pinned,
    name,
    type,
  }: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        deployUrl,
        description,
        githubUrl,
        pinned,
        name,
        type,
      },
    })

    return {
      projectId: project.id,
    }
  }

  async update(projectData: UpdateProjectDto, projectId: string) {
    await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...projectData,
      },
    })
  }

  async updateImage({ projectId, imageId, imageUrl }: UpdateProjectImageDto) {
    await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        imageId,
        imageUrl,
      },
    })
  }

  async getAll() {
    const projects = await this.prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        githubUrl: true,
        imageUrl: true,
        deployUrl: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return projects
  }

  async getPinned() {
    const projects = await this.prisma.project.findMany({
      where: {
        pinned: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        githubUrl: true,
        imageUrl: true,
        deployUrl: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return projects
  }

  async findById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        imageUrl: true,
        imageId: true,
        githubUrl: true,
        deployUrl: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return project
  }

  async delete(id: string) {
    const project = await this.findById(id)

    if (!project) {
      throw new NotFoundException('Projeto não encontrado')
    }

    await this.prisma.project.delete({
      where: {
        id,
      },
    })
  }
}
