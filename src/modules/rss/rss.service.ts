import * as Parser from 'rss-parser';

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { ArticleService } from '../article';
import { FeedService } from '../feed';

import { RSSItem } from './types';

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private parser = new Parser();

  constructor(
    private readonly feedService: FeedService,
    private readonly articleService: ArticleService,
  ) {}

  @Cron('*/15 * * * *')
  async handleCron() {
    this.logger.log('⏳ Starting RSS crawl...');
    const feeds = await this.feedService.findAll();

    for (const feed of feeds) {
      const items = await this.parseFeed(feed.url);

      for (const item of items) {
        await this.articleService.createIfNotExists({
          ...item,
          feedId: feed.id,
        });
      }
    }

    this.logger.log('✅ RSS crawl finished.');
  }

  private async parseFeed(feedUrl: string): Promise<RSSItem[]> {
    const feed = await this.parser.parseURL(feedUrl);

    return feed.items.map(
      (item): RSSItem => ({
        title: item.title || 'Untitled',
        url: item.link!,
        content: item.contentSnippet || item.content || '',
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      }),
    );
  }
}
