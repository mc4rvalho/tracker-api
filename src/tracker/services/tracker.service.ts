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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateTrackerDto: UpdateTrackerDto) {
    return `This action updates a #${id} tracker`;
  }

  remove(id: string) {
    return `This action removes a #${id} tracker`;
  }
}
