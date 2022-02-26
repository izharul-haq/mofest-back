import jwt from 'jsonwebtoken';
import env from '~/env';
import { AuthPayload } from '~/model/auth';

export const signJwt = (plain: string): string => {
  const signed = jwt.sign(plain, env.secret);
  return signed;
};

export const decodeJwt = (signed: string): AuthPayload => {
  const decoded = jwt.verify(signed, env.secret) as AuthPayload;
  return decoded;
};
