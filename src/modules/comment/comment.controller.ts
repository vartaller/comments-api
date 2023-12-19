import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpException,
  HttpStatus,
  Body,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { InputDataDto } from './dto/inputData.dto';
import { ByQueryDto } from './dto/byQuery.dto';
import { ERRORS } from '../../shared/constants/errors';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  postComment(@Body() data: InputDataDto) {
    return this.commentService.createComment(data);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get('by')
  @HttpCode(HttpStatus.OK)
  getCommentById(@Query() data: ByQueryDto) {
    if (!data.commentId && !data.userEmail) {
      throw new HttpException(
        ERRORS.INPUT_DATA.NEEDS_EMAIL_OR_ID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return data.commentId
      ? this.commentService.getCommentById(Number(data.commentId))
      : this.commentService.getCommentsByUserEmail(data.userEmail);
  }
}
