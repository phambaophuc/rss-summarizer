import { Expose, plainToInstance, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { Feed } from '@/entities';
import { ArticleDto } from '@/modules/article';

export class FeedDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @Type(() => ArticleDto)
  @ApiProperty()
  articles: ArticleDto[];

  static toDto(entity: Feed): FeedDto {
    return plainToInstance(FeedDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toDtos(entities: Feed[]): FeedDto[] {
    return entities.map((feed) => this.toDto(feed));
  }
}
