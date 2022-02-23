import { User } from '@prisma/client';
import { singleton } from 'tsyringe';
import DatabaseClient from '~/database/prisma';
import { UserCreateInput, UserUpdateInput } from '~/model/user';

@singleton()
class UserService {
  constructor(private db: DatabaseClient) {
    console.log('User service initialized');
  }

  public async getAll(): Promise<User[]> {
    const users = await this.db.client.user.findMany();

    return users;
  }

  public async getByID(id: string): Promise<User | null> {
    const user = await this.db.client.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  public async create(data: UserCreateInput): Promise<User> {
    const user = await this.db.client.user.create({ data });

    return user;
  }

  public async update(id: string, data: UserUpdateInput): Promise<User> {
    const user = await this.db.client.user.update({
      where: { id: id },
      data,
    });

    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = await this.db.client.user.delete({
      where: { id: id },
    });

    return user;
  }
}

export default UserService;
