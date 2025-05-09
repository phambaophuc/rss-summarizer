import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublisherDto } from './dto';
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

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: PublisherDto,
  })
  public async findById(@Param('id') id: string): Promise<PublisherDto> {
    return this.publisherService.findById(id);
  }
}
