import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import applyCors from './cors';
import applyMultipart from './multipart';
import applyAutoroutes from './routes';
import applySwagger from './swagger';

const intializeApp = async (): Promise<FastifyInstance> => {
  const server = fastify({
    ignoreTrailingSlash: true,
    logger: {
      level: 'info',
      file: path.join(__dirname, '../../', 'app.log'),
    },
  });

  applyAutoroutes(server);
  applyCors(server);
  applyMultipart(server);
  applySwagger(server);

  return server;
};

export default intializeApp;
