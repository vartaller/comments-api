import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { RedisService } from './modules/redis/redis.service';
import { RedisProvider } from './modules/redis/redis.provider';
import { LoggerService } from './shared/services/logger.service';

@Module({
  imports: [UserModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, LoggerService, RedisProvider, RedisService],
})
export class AppModule {}
