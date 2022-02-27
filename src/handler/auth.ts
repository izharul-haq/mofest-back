import { singleton } from 'tsyringe';
import APIError from '~/common/error/error';
import { verifyHash } from '~/common/util/hash';
import { signJwt } from '~/common/util/token';
import { AuthData, AuthPayload } from '~/model/auth';
import { UserRole } from '~/model/user';
import SessionService from '~/service/session';
import UserService from '~/service/user';

@singleton()
class AuthHandler {
  constructor(private userService: UserService, private sessionService: SessionService) {}

  public login = async (id: string, password: string): Promise<AuthData> => {
    const user = await this.userService.getByID(id);

    // Authenticate user
    if (!user) throw new APIError(400, 'User not found');

    if (!verifyHash(password, user.password))
      throw new APIError(401, 'Failed to authenticate user');

    // Create token
    const payload: AuthPayload = {
      id: user.id,
      role: user.role as UserRole,
    };

    const token = signJwt(payload);

    // Create token expired date
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 2);

    // Create session
    this.sessionService.create({ userId: user.id, expiredAt: expiredDate });

    return {
      token: token,
      exp: expiredDate.getTime(),
      role: user.role as UserRole,
      userId: user.id,
      name: user.name,
    };
  };
}

export default AuthHandler;
