import { Injectable } from '@nestjs/common';

import { PaginatedResultDto, PaginationQueryDto } from '@/common/dto';

import { FeedService } from '../feed';

import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepo: ArticleRepository,
    private readonly feedService: FeedService,
  ) {}

  async findAll(
    pagination: PaginationQueryDto,
  ): Promise<PaginatedResultDto<ArticleDto>> {
    const articles = await this.articleRepo.findAll(pagination);
    return { ...articles, data: ArticleDto.toDtos(articles.data) };
  }

  async createIfNotExists(dto: CreateArticleDto): Promise<boolean> {
    const exists = await this.articleRepo.findByUrl(dto.url);
    if (exists) return false;

    await this.feedService.findById(dto.feedId);
    await this.articleRepo.store(dto);

    return true;
  }
}
