import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from './user';

export interface AuthPayload extends JwtPayload {
  id: string;
  role: UserRole;
}
