import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.provider';
import { ERRORS } from '../../shared/constants/errors';
import { LoggerService } from '../../shared/services/logger.service';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClient,
    private readonly logger: LoggerService,
  ) {}

  async set(key: string, value: string) {
    const status = await this.client.set(key, value);
    if (status !== 'OK') {
      this.logger.warn(ERRORS.CACHE.WRITE);
    }
    return status;
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
