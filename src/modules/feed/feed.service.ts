import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateFeedDto, FeedDto } from './dto';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepo: FeedRepository) {}

  async findAll(): Promise<FeedDto[]> {
    const feeds = await this.feedRepo.findAll();
    return FeedDto.toDtos(feeds);
  }

  async findById(id: string): Promise<FeedDto> {
    const feed = await this.feedRepo.findById(id);
    if (!feed) {
      throw new NotFoundException('Feed not found.');
    }
    return FeedDto.toDto(feed);
  }

  async findByPublisher(id: string): Promise<FeedDto[]> {
    const feeds = await this.feedRepo.findByPublisher(id);
    return FeedDto.toDtos(feeds);
  }

  async create(dto: CreateFeedDto): Promise<FeedDto> {
    const feed = await this.feedRepo.store(dto);
    return FeedDto.toDto(feed);
  }
}
