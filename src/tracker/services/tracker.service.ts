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

  findAll() {
    return `This action returns all tracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracker`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateTrackerDto: UpdateTrackerDto) {
    return `This action updates a #${id} tracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracker`;
  }
}
