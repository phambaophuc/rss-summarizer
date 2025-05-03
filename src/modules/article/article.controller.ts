import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { PaginatedResultDto, PaginationQueryDto } from '@/common/dto';

import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('articles')
@ApiTags('ArticleController')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  public async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<ArticleDto>> {
    return this.articleService.findAll(query);
  }
}
