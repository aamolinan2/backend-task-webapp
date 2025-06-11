import { User } from '../models/user.model';
import admin from '../utils/firebase';

const db = admin.firestore();
const COLLECTION = 'users';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await db.collection(COLLECTION).where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...(doc.data() as Omit<User, 'id'>) };
  }

  async create(email: string): Promise<User> {
    const data = {
      email,
      createdAt: admin.firestore.Timestamp.now()
    };
    const ref = await db.collection(COLLECTION).add(data);
    return { id: ref.id, ...data };
  }
}
