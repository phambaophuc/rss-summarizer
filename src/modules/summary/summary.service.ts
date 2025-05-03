import { Injectable } from '@nestjs/common';

import { GeminiService } from '@/shared';

@Injectable()
export class SummaryService {
  constructor(private readonly geminiService: GeminiService) {}

  async summarize(content: string): Promise<string> {
    return this.geminiService.summarize(content);
  }
}
