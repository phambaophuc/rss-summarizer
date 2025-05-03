import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration, getTypeOrmConfig } from '@/config';
import { RssModule } from '@/modules/rss';

import { ArticleModule } from './modules/article';

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
  ],
})
export class AppModule {}
