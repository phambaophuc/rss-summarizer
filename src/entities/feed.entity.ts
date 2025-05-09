import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
import { Publisher } from './publisher.entity';

@Entity('feeds')
export class Feed extends BaseEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.feeds, {
    onDelete: 'CASCADE',
  })
  publisher: Publisher;

  @OneToMany(() => Article, (article) => article.feed)
  articles: Article[];
}
