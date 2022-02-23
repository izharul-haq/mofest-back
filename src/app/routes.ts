import { FastifyInstance } from 'fastify';
import fastifyAutoroutes from 'fastify-autoroutes';
import path from 'path';

const applyAutoroutes = (server: FastifyInstance): void => {
  server.register(fastifyAutoroutes, {
    dir: path.join(__dirname, '../routes'),
  });
};

export default applyAutoroutes;
