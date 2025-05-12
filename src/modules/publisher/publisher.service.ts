import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePublisherDto, PublisherDto } from './dto';
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

  async findBySlug(slug: string): Promise<PublisherDto> {
    const publisher = await this.publisherRepo.findBySlug(slug);
    if (!publisher) {
      throw new NotFoundException('Publisher not found.');
    }
    return PublisherDto.toDto(publisher);
  }

  async create(dto: CreatePublisherDto): Promise<PublisherDto> {
    const publisher = await this.publisherRepo.store(dto);
    return PublisherDto.toDto(publisher);
  }
}
