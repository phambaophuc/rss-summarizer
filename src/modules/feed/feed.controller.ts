import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateFeedDto, FeedDto } from './dto';
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

  @Post()
  public async create(@Body() body: CreateFeedDto): Promise<FeedDto> {
    return this.feedService.create(body);
  }
}
