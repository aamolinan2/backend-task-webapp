import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/repositories/user.repository';

jest.mock('../src/repositories/user.repository');

describe('UserService', () => {
  let service: UserService;
  let repoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repoMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new UserService();
    // @ts-ignore
    service['repo'] = repoMock;
  });

  it('should return existing user', async () => {
    const user = { id: 'u1', email: 'test@example.com', createdAt: {} as any };
    repoMock.findByEmail.mockResolvedValue(user);

    const result = await service.findOrCreateUser(user.email);
    expect(result.user).toEqual(user);
    expect(result.created).toBe(false);
  });

  it('should create user if not found', async () => {
    repoMock.findByEmail.mockResolvedValue(null);
    const newUser = { id: 'u2', email: 'nuevo@example.com', createdAt: {} as any };
    repoMock.create.mockResolvedValue(newUser);

    const result = await service.findOrCreateUser(newUser.email);
    expect(result.user).toEqual(newUser);
    expect(result.created).toBe(true);
  });
});