import { Injectable } from '@nestjs/common';

import { PaginationQueryDto } from '@/common/dto';

import { ArticleRepository } from './article.repository';
import {
  ArticleDto,
  CreateArticleDto,
  PaginatedArticleResponseDto,
} from './dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepo: ArticleRepository) {}

  async findAllWithFilter(
    pagination: PaginationQueryDto,
  ): Promise<PaginatedArticleResponseDto> {
    const articles = await this.articleRepo.findAllWithFilter(pagination);
    return { ...articles, items: ArticleDto.toDtos(articles.items) };
  }

  async createIfNotExists(dto: CreateArticleDto): Promise<boolean> {
    const exists = await this.articleRepo.findByUrl(dto.url);
    if (exists) return false;

    // await this.feedService.findById(dto.feedId);
    await this.articleRepo.store(dto);

    return true;
  }
}
