
import { TaskService } from '../src/services/task.service';
import { TaskRepository } from '../src/repositories/task.repository';

jest.mock('../src/repositories/task.repository');

describe('TaskService', () => {
  let service: TaskService;
  let repoMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    repoMock = new TaskRepository() as jest.Mocked<TaskRepository>;
    service = new TaskService();
    // @ts-ignore
    service['repository'] = repoMock;
  });

  it('should retrieve tasks for user', async () => {
    const fakeTasks = [{ id: '1', title: 'Test', description: '', createdAt: {} as any, completed: false, userId: 'u1' }];
    repoMock.getAllByUser.mockResolvedValue(fakeTasks);
    const tasks = await service.getTasksByUser('u1');
    expect(tasks).toEqual(fakeTasks);
  });

  it('should create a new task', async () => {
    const dto = { title: 'New', description: 'Desc' };
    const created = { ...dto, id: '1', createdAt: {} as any, completed: false, userId: 'u1' };
    repoMock.create.mockResolvedValue(created);
    const task = await service.createTask('u1', dto);
    expect(task).toEqual(created);
  });
});
