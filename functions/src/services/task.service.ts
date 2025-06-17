
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';
import admin from '../utils/firebase';
import sanitizeHtml from 'sanitize-html';

export class TaskService {
  private repository = new TaskRepository();

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.repository.getAllByUser(userId);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.repository.getAll();
  }

  async createTask(userId: string, data: { title: string; description: string }): Promise<Task> {
    const title = sanitizeHtml(data.title, { allowedTags: [], allowedAttributes: {} });
    const description = sanitizeHtml(data.description || '', { allowedTags: [], allowedAttributes: {} });

    const newTask: Omit<Task, 'id'> = {
      title,
      description,
      createdAt: admin.firestore.Timestamp.now(),
      completed: false,
      userId,
    };

    return this.repository.create(newTask);
  }

  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    if (updates.title)
      updates.title = sanitizeHtml(updates.title, { allowedTags: [], allowedAttributes: {} });

    if (updates.description)
      updates.description = sanitizeHtml(updates.description, { allowedTags: [], allowedAttributes: {} });

    await this.repository.update(id, updates);
    const updated = await this.repository.getAllByUser(updates.userId!);
    return updated.find(t => t.id === id)!;
  }

  async deleteTask(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
