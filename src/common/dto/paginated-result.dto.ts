import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto<T> {
  @ApiProperty({ type: [Object] })
  items: T[];

  @ApiProperty({
    type: Object,
    example: {
      page: 1,
      limit: 10,
      totalItems: 42,
      totalPages: 5,
    },
  })
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
