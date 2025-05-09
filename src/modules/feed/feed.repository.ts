import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Feed } from '@/entities';

@Injectable()
export class FeedRepository extends Repository<Feed> {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,
  ) {
    super(
      feedRepository.target,
      feedRepository.manager,
      feedRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Feed[]> {
    return this.find({ order: { name: 'DESC' } });
  }

  public async findById(id: string): Promise<Feed | null> {
    return this.findOneBy({ id });
  }

  public async findByPublisher(id: string): Promise<Feed[]> {
    return this.find({ where: { publisher: { id } } });
  }
}
