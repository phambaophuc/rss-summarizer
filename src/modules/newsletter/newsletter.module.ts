import { Module } from '@nestjs/common';

import { SummaryModule } from '@/modules/summary';

import { NewsletterService } from './newsletter.service';

@Module({
  imports: [SummaryModule],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
