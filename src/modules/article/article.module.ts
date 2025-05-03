import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from '@/entities';

import { FeedModule } from '../feed';

import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), FeedModule],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleRepository, ArticleService],
})
export class ArticleModule {}
