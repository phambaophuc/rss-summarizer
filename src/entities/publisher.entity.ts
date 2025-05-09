import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Feed } from './feed.entity';

@Entity('publisers')
export class Publisher extends BaseEntity {
  @Column()
  name: string;

  @Column()
  homepage: string;

  @OneToMany(() => Feed, (feed) => feed.publisher)
  feeds: Feed[];
}
