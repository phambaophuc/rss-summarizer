import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Publisher } from '@/entities';

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
}
