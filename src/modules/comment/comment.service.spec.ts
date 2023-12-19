import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserService } from '../user/user.service';
import { InputDataDto } from './dto/inputData.dto';

describe('CommentService', () => {
  let commentService: CommentService;
  let prismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, PrismaService, UserService],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  describe('createComment', () => {
    it('should create comment and user if user does not exist', async () => {
      const inputData: InputDataDto = {
        userData: {
          name: 'newuser',
          email: 'newuser@example.com',
        },
        commentData: { captcha: 'captcha', text: 'Test comment' },
      };

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(null);
      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValueOnce({ email: 'newuser@example.com' } as any);
      jest
        .spyOn(prismaService.comment, 'create')
        .mockResolvedValueOnce({} as any);

      const result = await commentService.createComment(inputData);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(
        'newuser@example.com',
      );
      expect(userService.createUser).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        name: 'newuser',
      });
      expect(prismaService.comment.create).toHaveBeenCalledWith({
        data: {
          ...inputData.commentData,
          userEmail: 'newuser@example.com',
        },
      });
      expect(result).toEqual({});
    });

    it('should create comment for existing user', async () => {
      const inputData: InputDataDto = {
        userData: {
          name: 'newuser',
          email: 'existinguser@example.com',
        },
        commentData: { captcha: 'captcha', text: 'Test comment' },
      };

      jest
        .spyOn(userService, 'getUserByEmail')
        .mockResolvedValueOnce({ email: 'existinguser@example.com' } as any);
      jest
        .spyOn(prismaService.comment, 'create')
        .mockResolvedValueOnce({} as any);

      const result = await commentService.createComment(inputData);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(
        'existinguser@example.com',
      );
      expect(prismaService.comment.create).toHaveBeenCalledWith({
        data: {
          ...inputData.commentData,
          userEmail: 'existinguser@example.com',
        },
      });
      expect(result).toEqual({});
    });
  });

  describe('getAllComments', () => {
    it('should return all comments', async () => {
      // Arrange
      const comments = [
        { id: 1, text: 'Comment 1' },
        { id: 2, text: 'Comment 2' },
      ];
      jest
        .spyOn(prismaService.comment, 'findMany')
        .mockResolvedValueOnce(comments as any);

      // Act
      const result = await commentService.getAllComments();

      // Assert
      expect(prismaService.comment.findMany).toHaveBeenCalled();
      expect(result).toEqual(comments);
    });
  });

  // Add more test cases for other methods as needed
});
