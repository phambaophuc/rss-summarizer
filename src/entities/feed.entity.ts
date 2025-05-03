import { Column, Entity, OneToMany } from 'typeorm';

import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity('feeds')
export class Feed extends BaseEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @OneToMany(() => Article, (article) => article.feed)
  articles: Article[];
}
