import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePublisherDto, PublisherDto } from './dto';
import { PublisherService } from './publisher.service';

@Controller('publishers')
@ApiTags('PublisherController')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [PublisherDto],
  })
  public async findAll(): Promise<PublisherDto[]> {
    return this.publisherService.findAll();
  }

  @Get(':slug')
  @ApiResponse({
    status: 200,
    type: PublisherDto,
  })
  public async findBySlug(@Param('slug') slug: string): Promise<PublisherDto> {
    return this.publisherService.findBySlug(slug);
  }

  @Post()
  public async create(@Body() body: CreatePublisherDto): Promise<PublisherDto> {
    return this.publisherService.create(body);
  }
}
