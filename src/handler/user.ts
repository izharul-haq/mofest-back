import { singleton } from 'tsyringe';
import APIError from '~/common/error/error';
import { User, UserCreateInput, UserUpdateInput } from '~/model/user';
import UserService from '~/service/user';

@singleton()
class UserHandler {
  constructor(private userService: UserService) {}

  public getAll = async (): Promise<User[]> => {
    const user = await this.userService.getAll();

    return user;
  };

  public getByID = async (id: string): Promise<User> => {
    const user = await this.userService.getByID(id);

    if (user) {
      return user;
    } else {
      throw new APIError(404, 'User not found');
    }
  };

  public create = async (data: UserCreateInput): Promise<User> => {
    const user = await this.userService.create(data);

    return user;
  };

  public update = async (id: string, data: UserUpdateInput): Promise<User> => {
    const user = await this.userService.update(id, data);

    return user;
  };

  public delete = async (id: string): Promise<User> => {
    const user = await this.userService.delete(id);

    return user;
  };
}

export default UserHandler;
