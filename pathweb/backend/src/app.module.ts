import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserEntity } from './user/entities/user.entity';
import { StoreEntity } from './store/entities/store.entity';
import { RatingEntity } from './rating/entities/rating.entity';

import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { RatingService } from './rating/rating.service';
import { RatingController } from './rating/rating.controller';
import { RatingModule } from './rating/rating.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

import * as process from 'process';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:['.env'],
    }),
    TypeOrmModule.forRoot({
      type : "mysql",
      host : "localhost",
      port : 3306,
      username : "root",
      password : "#pluto230716",
      database : "recom_path",
      entities : [StoreEntity, UserEntity, RatingEntity],
      synchronize : true,
    }),
    StoreModule,
    UserModule,
    RatingModule,
    PostsModule,
    AuthModule,
  ],
  providers: [RatingService],
  controllers: [RatingController],
})
export class AppModule {}