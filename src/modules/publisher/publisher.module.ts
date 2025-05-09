import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Publisher } from '@/entities';

import { PublisherController } from './publisher.controller';
import { PublisherRepository } from './publisher.repository';
import { PublisherService } from './publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  exports: [PublisherService],
  controllers: [PublisherController],
  providers: [PublisherRepository, PublisherService],
})
export class PublisherModule {}
