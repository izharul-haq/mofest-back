import { FastifyInstance } from 'fastify';
import fastifyMultipart from 'fastify-multipart';

const applyMultipart = (server: FastifyInstance): void => {
  server.register(fastifyMultipart);
};

export default applyMultipart;
