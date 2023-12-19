import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisProvider } from '../redis/redis.provider';

@Module({
  providers: [
    CommentService,
    PrismaService,
    UserService,
    RedisService,
    RedisProvider,
    LoggerService,
  ],
  controllers: [CommentController],
})
export class CommentModule {}
