import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GeminiService } from '@/shared';

import { ExtractedContentDto, ExtractorQuery } from './dto';
import { ExtractorService } from './extractor.service';

@Controller('extract')
@ApiTags('ExtractorController')
export class ExtractorController {
  constructor(
    private readonly extractorService: ExtractorService,
    private readonly geminiService: GeminiService,
  ) {}

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

  @Get('summarize')
  @ApiQuery({ name: 'url', required: true })
  public async summarizeContent(
    @Query() query: ExtractorQuery,
  ): Promise<{ content: string }> {
    const { url } = query;

    const extracted = await this.extractorService.extractFromUrl(url);
    if (!extracted) {
      throw new BadRequestException('Không thể tóm tắt nội dung.');
    }

    return {
      content: await this.geminiService.summarize(extracted.content),
    };
  }
}
