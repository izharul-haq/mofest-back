import { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import AuthSchema from './schema/auth';
import MovieSchema from './schema/movie';
import UserSchema from './schema/user';
import ViewSchema from './schema/view';

const applySwagger = (server: FastifyInstance): void => {
  server.register(fastifySwagger, {
    routePrefix: '/docs',
    openapi: {
      info: {
        title: 'Mofest API Documentation',
        description: 'Movie festival API system documentation.',
        version: '0.1.0',
      },
      servers: [{ url: 'http://localhost:3000' }],
      paths: {},
    },
    exposeRoute: true,
  });

  server.addSchema(MovieSchema);
  server.addSchema(UserSchema);
  server.addSchema(ViewSchema);
  server.addSchema(AuthSchema);
};

export default applySwagger;
