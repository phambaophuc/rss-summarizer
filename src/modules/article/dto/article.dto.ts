import { Expose, plainToInstance, Type } from 'class-transformer';

import { Article } from '@/entities';
import { FeedDto } from '@/modules/feed';

export class ArticleDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  url: string;

  @Expose()
  content: string;

  @Expose()
  publishedAt: Date;

  @Expose()
  @Type(() => FeedDto)
  feed: FeedDto;

  static toDto(entity: Article): ArticleDto {
    return plainToInstance(ArticleDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toDtos(entities: Article[]): ArticleDto[] {
    return entities.map((feed) => this.toDto(feed));
  }
}
