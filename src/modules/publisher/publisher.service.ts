import { Injectable, NotFoundException } from '@nestjs/common';

import { PublisherDto } from './dto';
import { PublisherRepository } from './publisher.repository';

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepo: PublisherRepository) {}

  async findAll(): Promise<PublisherDto[]> {
    const publishers = await this.publisherRepo.findAll();
    return PublisherDto.toDtos(publishers);
  }

  async findById(id: string): Promise<PublisherDto> {
    const publisher = await this.publisherRepo.findById(id);
    if (!publisher) {
      throw new NotFoundException('Publisher not found.');
    }
    return PublisherDto.toDto(publisher);
  }
}
