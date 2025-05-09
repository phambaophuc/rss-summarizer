import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginatedResultDto } from '@/common/dto';
import { Article } from '@/entities';

import { CreateArticleDto, GetArticlesQueryDto } from './dto';

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

  public async findAllWithFilter(
    pagination: GetArticlesQueryDto,
  ): Promise<PaginatedResultDto<Article>> {
    const { feedId, publisherId, page = 1, limit = 10 } = pagination;
    const [items, total] = await this.findAndCount({
      where: {
        feed: {
          id: feedId,
          publisher: {
            id: publisherId,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        feed: true,
      },
      order: {
        publishedAt: 'DESC',
      },
    });

    return {
      items,
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
