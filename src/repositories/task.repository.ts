
import { Task } from '../models/task.model';
import admin from '../utils/firebase';

const db = admin.firestore();
const COLLECTION = 'tasks';

export class TaskRepository {
  async getAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await db
      .collection(COLLECTION)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, 'id'>),
    }));
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const docRef = await db.collection(COLLECTION).add(task);
    const snap = await docRef.get();
    return { id: docRef.id, ...(snap.data() as Omit<Task, 'id'>) };
  }

  async update(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<void> {
    await db.collection(COLLECTION).doc(id).update(updates);
  }

  async delete(id: string): Promise<void> {
    await db.collection(COLLECTION).doc(id).delete();
  }
}
