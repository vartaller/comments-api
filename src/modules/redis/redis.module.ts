import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { LoggerService } from '../../shared/services/logger.service';

@Module({
  providers: [RedisProvider, RedisService, LoggerService],
  exports: [RedisService],
})
export class RedisModule {}
