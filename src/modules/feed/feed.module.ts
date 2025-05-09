import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feed } from '@/entities';

import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  exports: [FeedService],
  controllers: [FeedController],
  providers: [FeedRepository, FeedService],
})
export class FeedModule {}
