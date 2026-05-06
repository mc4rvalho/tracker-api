import { Injectable } from '@nestjs/common';
import { CreateTrackerDto } from '../dto/create-tracker.dto';
import { UpdateTrackerDto } from '../dto/update-tracker.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackerService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackerDto: CreateTrackerDto) {
    return await this.prisma.tracker.create({
      data: createTrackerDto,
    });
  }

  async findAll() {
    return await this.prisma.tracker.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.tracker.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTrackerDto: UpdateTrackerDto) {
    return await this.prisma.tracker.update({
      where: { id },
      data: updateTrackerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.tracker.delete({
      where: { id },
    });
  }
}
