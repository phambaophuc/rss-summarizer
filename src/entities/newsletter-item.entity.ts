import { Entity, ManyToOne } from 'typeorm';

import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
import { Newsletter } from './newsletter.entity';

@Entity('newsletter_items')
export class NewsletterItem extends BaseEntity {
  @ManyToOne(() => Article, { onDelete: 'CASCADE' })
  article: Article;

  @ManyToOne(() => Newsletter, (newsletter) => newsletter.items, {
    onDelete: 'CASCADE',
  })
  newsletter: Newsletter;
}
