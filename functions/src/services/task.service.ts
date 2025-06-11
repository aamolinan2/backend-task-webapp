
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';
import admin from '../utils/firebase';

export class TaskService {
  private repository = new TaskRepository();

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.repository.getAllByUser(userId);
  }

  async createTask(userId: string, data: { title: string; description: string }): Promise<Task> {
    const newTask: Omit<Task, 'id'> = {
      title: data.title,
      description: data.description,
      createdAt: admin.firestore.Timestamp.now(),
      completed: false,
      userId,
    };
    return this.repository.create(newTask);
  }

  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    await this.repository.update(id, updates);
    const updated = await this.repository.getAllByUser(updates.userId!);
    return updated.find(t => t.id === id)!;
  }

  async deleteTask(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
