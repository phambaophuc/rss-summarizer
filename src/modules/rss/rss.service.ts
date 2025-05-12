import * as Parser from 'rss-parser';

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { ArticleService } from '../article';
import { FeedDto, FeedService } from '../feed';

import { RSSItem } from './types';

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private parser = new Parser();
  private isRunning = false;

  constructor(
    private readonly feedService: FeedService,
    private readonly articleService: ArticleService,
  ) {}

  @Cron('*/15 * * * *')
  async handleCron() {
    if (this.isRunning) {
      this.logger.warn('⚠️ RSS crawl skipped: previous job still running.');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();
    this.logger.log(`⏳ Starting RSS crawl...`);

    try {
      const feeds = await this.feedService.findAll();
      const BATCH_SIZE = 5;

      for (let i = 0; i < feeds.length; i += BATCH_SIZE) {
        const batch = feeds.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((feed) => this.processFeed(feed)));
      }
    } catch (error) {
      this.logger.error('RSS crawl failed\n', error);
    } finally {
      this.logger.log(
        `✅ RSS crawl finished in ${(Date.now() - startTime) / 1000}s`,
      );
      this.isRunning = false;
    }
  }

  private async processFeed(feed: FeedDto) {
    try {
      const items = await this.parseFeed(feed.url);

      for (const item of items) {
        const created = await this.articleService.createIfNotExists({
          ...item,
          feedId: feed.id,
        });
        if (!created) break;
      }
    } catch (error) {
      this.logger.error(`Failed to process feed ${feed.url}`, error);
    }
  }

  async parseFeed(feedUrl: string): Promise<RSSItem[]> {
    const feed = await this.parser.parseURL(feedUrl);

    return feed.items.map(
      (item): RSSItem => ({
        title: item.title || 'Untitled',
        url: item.link!,
        content: item.contentSnippet || item.content || 'No content available',
        thumbnail: item.enclosure?.url || '',
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      }),
    );
  }
}
