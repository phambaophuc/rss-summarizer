import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Publisher } from '@/entities';
import { generateSlug } from '@/utils/slug.util';

import { CreatePublisherDto } from './dto';

@Injectable()
export class PublisherRepository extends Repository<Publisher> {
  constructor(
    @InjectRepository(Publisher) private publisherRepo: Repository<Publisher>,
  ) {
    super(
      publisherRepo.target,
      publisherRepo.manager,
      publisherRepo.queryRunner,
    );
  }

  public async findAll(): Promise<Publisher[]> {
    return this.find({
      relations: { feeds: { articles: true } },
    });
  }

  public async findById(id: string): Promise<Publisher | null> {
    return this.findOne({ where: { id }, relations: { feeds: true } });
  }

  public async findBySlug(slug: string): Promise<Publisher | null> {
    return this.findOne({ where: { slug }, relations: { feeds: true } });
  }

  public async store(dto: CreatePublisherDto) {
    const slug = generateSlug(dto.name);
    const publisher = this.create({ ...dto, slug });
    return this.save(publisher);
  }
}
