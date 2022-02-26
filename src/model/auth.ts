import { JwtPayload } from 'jsonwebtoken';
import { User, UserRole } from './user';

export interface AuthPayload extends JwtPayload {
  id: string;
  role: UserRole;
}

export interface AuthData {
  token: string;
  exp: number;
  role: UserRole;
  user: User;
}
