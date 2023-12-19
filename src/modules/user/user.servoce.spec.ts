import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../shared/services/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getUserByEmail', () => {
    it('should return user when user exists', async () => {
      const userEmail = 'existinguser@example.com';
      const user = { email: userEmail } as any;

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);

      const result = await userService.getUserByEmail(userEmail);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: userEmail },
      });
      expect(result).toEqual(user);
    });

    it('should return null when user does not exist', async () => {
      const userEmail = 'nonexistentuser@example.com';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      const result = await userService.getUserByEmail(userEmail);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: userEmail },
      });
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const userData = { name: 'John Doe', email: 'newuser@example.com' };
      const createdUser = { email: userData.email } as any;

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce(createdUser);

      const result = await userService.createUser(userData);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: userData,
      });
      expect(result).toEqual(createdUser);
    });
  });
});
