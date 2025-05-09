import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FeedDto } from './dto';
import { FeedService } from './feed.service';

@Controller('feeds')
@ApiTags('FeedController')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [FeedDto],
  })
  public async findAll(): Promise<FeedDto[]> {
    return this.feedService.findAll();
  }
}
