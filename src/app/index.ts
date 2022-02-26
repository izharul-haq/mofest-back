import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import applyAuth from './auth';
import applyCors from './cors';
import applyMulter from './multer';
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

  applyCors(server);
  applySwagger(server);
  applyAuth(server);
  applyAutoroutes(server);
  applyMulter(server);

  return server;
};

export default intializeApp;
