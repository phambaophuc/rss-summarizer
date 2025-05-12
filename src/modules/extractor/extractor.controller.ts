import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExtractedContentDto, ExtractorQuery } from './dto';
import { ExtractorService } from './extractor.service';

@Controller('extract')
@ApiTags('ExtractorController')
export class ExtractorController {
  constructor(private readonly extractorService: ExtractorService) {}

  @Get()
  @ApiQuery({ name: 'url', required: true })
  @ApiResponse({
    type: ExtractedContentDto,
  })
  public async extract(
    @Query() query: ExtractorQuery,
  ): Promise<ExtractedContentDto | null> {
    const { url } = query;
    return await this.extractorService.extractFromUrl(url);
  }
}
