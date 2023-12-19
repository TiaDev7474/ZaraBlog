import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './lib/gaurds/auth.gaurd';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedule } from './schedule/task.schedule';
import { OauthModule } from './oauth/oauth.module';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TaskSchedule,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    MailModule,
    UsersModule,
    StorageModule,
    OauthModule,
    EventsModule,
    PostsModule,
    TagsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
