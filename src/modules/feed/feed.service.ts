import { Injectable, NotFoundException } from '@nestjs/common';

import { FeedDto } from './dto';
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
}
