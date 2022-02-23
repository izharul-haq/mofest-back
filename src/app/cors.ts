import { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

const applyCors = (server: FastifyInstance): void => {
  server.register(fastifyCors, {
    origin: ['http://localhost:8080'],
    methods: ['GET', 'PUT', 'POST'],
  });
};

export default applyCors;
