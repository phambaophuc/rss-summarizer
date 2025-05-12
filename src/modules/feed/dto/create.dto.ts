import { IsNotEmpty, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUrl()
  url: string;
}
