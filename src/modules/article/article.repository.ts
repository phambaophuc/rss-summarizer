import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginatedResultDto, PaginationQueryDto } from '@/common/dto';
import { Article } from '@/entities';

import { CreateArticleDto } from './dto';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {
    super(
      articleRepository.target,
      articleRepository.manager,
      articleRepository.queryRunner,
    );
  }

  public async findAll(
    pagination: PaginationQueryDto,
  ): Promise<PaginatedResultDto<Article>> {
    const { page = 1, limit = 10 } = pagination;
    const [items, total] = await this.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        feed: true,
        summary: true,
      },
      order: {
        publishedAt: 'DESC',
      },
    });

    return {
      data: items,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public async findByUrl(url: string): Promise<Article | null> {
    return this.findOneBy({ url });
  }

  public async store(dto: CreateArticleDto): Promise<Article> {
    const article = this.create({ ...dto, feed: { id: dto.feedId } });
    return this.save(article);
  }
}
