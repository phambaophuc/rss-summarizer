import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Feed } from './feed.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  url: string;

  @Column('text')
  content: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @ManyToOne(() => Feed, (feed) => feed.articles, { onDelete: 'CASCADE' })
  feed: Feed;
}
