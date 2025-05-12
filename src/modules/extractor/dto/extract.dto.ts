import { IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ExtractedContentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  published?: string;
}

export class ExtractorQuery {
  @IsUrl()
  url: string;
}
