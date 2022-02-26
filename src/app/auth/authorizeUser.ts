import { FastifyAuthFunction } from 'fastify-auth';
import { decodeJwt } from '~/common/util/token';
import { UserRole } from '~/model/user';

const authorizeUser: FastifyAuthFunction = (request, reply, done) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    done(new Error('Authorization header not found'));
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    done(new Error('Token not found'));
    return;
  }

  const payload = decodeJwt(token);
  if (payload.role !== UserRole.USER) {
    done(new Error('Authorization failed'));
    return;
  }

  done();
};

export default authorizeUser;
