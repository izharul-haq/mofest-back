import { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';

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
};

export default applySwagger;
