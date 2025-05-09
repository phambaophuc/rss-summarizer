import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration, getTypeOrmConfig } from '@/config';
import { RssModule } from '@/modules/rss';

import { ArticleModule } from './modules/article';
import { ExtractorModule } from './modules/extractor';
import { FeedModule } from './modules/feed';
import { PublisherModule } from './modules/publisher';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    RssModule,
    ArticleModule,
    FeedModule,
    RssModule,
    PublisherModule,
    ExtractorModule,
  ],
})
export class AppModule {}
