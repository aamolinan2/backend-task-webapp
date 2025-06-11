import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private repo = new UserRepository();

  async findOrCreateUser(email: string): Promise<{ user: User; created: boolean }> {
    let user = await this.repo.findByEmail(email);
    if (user) return { user, created: false };

    user = await this.repo.create(email);
    return { user, created: true };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email);
  }
}