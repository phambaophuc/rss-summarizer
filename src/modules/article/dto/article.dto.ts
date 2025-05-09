import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResultDto, PaginationQueryDto } from '@/common/dto';
import { Article } from '@/entities';
import { FeedDto } from '@/modules/feed';

export class ArticleDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  thumbnail: string;

  @Expose()
  @ApiProperty()
  publishedAt: Date;

  @Expose()
  @Type(() => FeedDto)
  @ApiProperty()
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

export class GetArticlesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsUUID()
  feedId?: string;

  @IsOptional()
  @IsUUID()
  publisherId?: string;
}

export class PaginatedArticleResponseDto extends PaginatedResultDto<ArticleDto> {
  @ApiProperty({ type: [ArticleDto] })
  declare items: ArticleDto[];
}
