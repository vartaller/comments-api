import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import { InputDataDto } from './dto/inputData.dto';
import { sanitize } from 'isomorphic-dompurify';
import { ERRORS } from '../../shared/constants/errors';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  async createComment(inputData: InputDataDto) {
    inputData.commentData.text = await this.proccessHtml(
      inputData.commentData.text,
    );

    if (inputData.commentData.parentId) {
      const comment = await this.getCommentById(
        Number(inputData.commentData.parentId),
      );
      if (!comment) {
        throw new HttpException(
          ERRORS.INPUT_DATA.WRONG_PARENT_ID,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    let userInDB;
    const userInCache = await this.redisService.get(inputData.userData.email);
    if (!userInCache) {
      userInDB = await this.userService.getUserByEmail(
        inputData.userData.email,
      );
    }
    if (!userInDB && !userInCache) {
      const user = await this.userService.createUser({
        ...inputData.userData,
      });
      await this.redisService.set(user.email, String(user.id));
    }
    return await this.prisma.comment.create({
      data: {
        ...inputData.commentData,
        userEmail: inputData.userData.email,
      },
    });
  }

  async getAllComments() {
    return await this.prisma.comment.findMany();
  }

  async getCommentById(id: number) {
    return await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getCommentsByUserEmail(email: string) {
    return await this.prisma.comment.findMany({
      where: {
        userEmail: email,
      },
    });
  }

  private async proccessHtml(htmlText: string) {
    const allowedTags = ['a', 'code', 'i', 'strong'];

    return sanitize(htmlText, {
      ALLOWED_TAGS: allowedTags,
      ALLOW_UNKNOWN_PROTOCOLS: false,
      USE_PROFILES: { html: true },
    });
  }
}
