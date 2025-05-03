import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity('summaries')
export class Summary extends BaseEntity {
  @Column('text')
  content: string;

  @OneToOne(() => Article, (article) => article.summary, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  article: Article;
}
