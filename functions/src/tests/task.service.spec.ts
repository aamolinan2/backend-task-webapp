import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';

jest.mock('../repositories/task.repository');

describe('TaskService', () => {
  let service: TaskService;
  let repoMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    repoMock = new TaskRepository() as jest.Mocked<TaskRepository>;
    service = new TaskService();
    // @ts-ignore
    service['repository'] = repoMock;
  });

  it('should return tasks for user', async () => {
    const fakeTasks = [
      { id: '1', title: 'Tarea 1', description: '', createdAt: {} as any, completed: false, userId: 'u1' }
    ];
    repoMock.getAllByUser.mockResolvedValue(fakeTasks);

    const result = await service.getTasksByUser('u1');
    expect(result).toEqual(fakeTasks);
  });

  it('should create a task', async () => {
    const newTask = { title: 'Tarea', description: 'desc' };
    const created = { ...newTask, id: '1', createdAt: {} as any, completed: false, userId: 'u1' };
    repoMock.create.mockResolvedValue(created);

    const result = await service.createTask('u1', newTask);
    expect(result).toEqual(created);
  });
});