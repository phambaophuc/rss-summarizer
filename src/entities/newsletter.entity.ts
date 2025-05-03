import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { NewsletterItem } from './newsletter-item.entity';

@Entity('newsletters')
export class Newsletter extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => NewsletterItem, (item) => item.newsletter)
  items: NewsletterItem[];
}
