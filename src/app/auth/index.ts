import { FastifyInstance } from 'fastify';
import fastifyAuth from 'fastify-auth';
import authorizeUser from './authorizeUser';

const applyAuth = (server: FastifyInstance): void => {
  server.decorate('authorizeUser', authorizeUser);

  server.register(fastifyAuth);
};

export default applyAuth;
