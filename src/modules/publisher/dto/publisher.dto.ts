import { Expose, plainToInstance, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { Publisher } from '@/entities';
import { FeedDto } from '@/modules/feed';

export class PublisherDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  homepage: string;

  @Expose()
  @Type(() => FeedDto)
  @ApiProperty({ type: [FeedDto] })
  feeds: FeedDto[];

  static toDto(entity: Publisher): PublisherDto {
    return plainToInstance(PublisherDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toDtos(entities: Publisher[]): PublisherDto[] {
    return entities.map((publisher) => this.toDto(publisher));
  }
}
