import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { RssService } from './rss.service';
import { RSSItem } from './types';

@Controller('rss')
@ApiTags('RssController')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post()
  @ApiBody({
    description: 'URL of the feed to scrape',
    type: Object,
  })
  public async scrapeFeed(
    @Body() body: { feedUrl: string },
  ): Promise<RSSItem[]> {
    return this.rssService.parseFeed(body.feedUrl);
  }
}
