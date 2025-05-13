import { Module } from '@nestjs/common';

import { GeminiModule } from '@/shared';

import { ExtractorController } from './extractor.controller';
import { ExtractorService } from './extractor.service';

@Module({
  imports: [GeminiModule],
  controllers: [ExtractorController],
  providers: [ExtractorService],
})
export class ExtractorModule {}
