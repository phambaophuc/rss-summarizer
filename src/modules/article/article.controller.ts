import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from '@/common/dto';

import { ArticleService } from './article.service';
import { PaginatedArticleResponseDto } from './dto';

@Controller('articles')
@ApiTags('ArticleController')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiQuery({ name: 'feedId', required: false })
  @ApiQuery({ name: 'sourceId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    type: PaginatedArticleResponseDto,
  })
  public async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedArticleResponseDto> {
    return this.articleService.findAllWithFilter(query);
  }
}
