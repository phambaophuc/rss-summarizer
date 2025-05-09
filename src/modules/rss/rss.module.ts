import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ArticleModule } from '../article';
import { FeedModule } from '../feed';

import { RssController } from './rss.controller';
import { RssService } from './rss.service';

@Module({
  imports: [ScheduleModule.forRoot(), FeedModule, ArticleModule],
  providers: [RssService],
  controllers: [RssController],
  exports: [RssService],
})
export class RssModule {}
