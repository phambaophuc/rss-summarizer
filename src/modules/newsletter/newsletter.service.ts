import { Injectable } from '@nestjs/common';

import { SummaryService } from '@/modules/summary';

@Injectable()
export class NewsletterService {
  constructor(private readonly summaryService: SummaryService) {}

  async createNewsletter(articles: { title: string; content: string }[]) {
    const summaries = await Promise.all(
      articles.map(async (article) => ({
        title: article.title,
        summary: await this.summaryService.summarize(article.content),
      })),
    );

    return {
      title: `Newsletter ngày ${new Date().toLocaleDateString()}`,
      items: summaries,
    };
  }
}
