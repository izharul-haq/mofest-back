import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from './user';

export interface AuthPayload extends JwtPayload {
  id: string;
  role: UserRole;
}

export type AuthData = {
  token: string;
  exp: number;
  role: UserRole;
  userId: string;
  name: string;
};
