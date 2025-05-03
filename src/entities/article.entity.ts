import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Feed } from './feed.entity';
import { Summary } from './summary.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column()
  url: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @Column({ default: false })
  isSummarized: boolean;

  @ManyToOne(() => Feed, (feed) => feed.articles, { onDelete: 'CASCADE' })
  feed: Feed;

  @OneToOne(() => Summary, (summary) => summary.article)
  summary: Summary;
}
