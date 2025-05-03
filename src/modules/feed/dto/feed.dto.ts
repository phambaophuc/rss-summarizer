import { Expose, plainToInstance } from 'class-transformer';

import { Feed } from '@/entities';

export class FeedDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  url: string;

  static toDto(entity: Feed): FeedDto {
    return plainToInstance(FeedDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toDtos(entities: Feed[]): FeedDto[] {
    return entities.map((feed) => this.toDto(feed));
  }
}
