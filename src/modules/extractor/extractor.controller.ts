import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExtractedContentDto } from './dto';
import { ExtractorService } from './extractor.service';

@Controller('extract')
export class ExtractorController {
  constructor(private readonly extractorService: ExtractorService) {}

  @Get()
  @ApiResponse({
    type: ExtractedContentDto,
  })
  async extract(
    @Query('url') url: string,
  ): Promise<ExtractedContentDto | null> {
    return await this.extractorService.extractFromUrl(url);
  }
}
