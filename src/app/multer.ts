import { FastifyInstance } from 'fastify';
import multer from 'fastify-multer';

export const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, 'upload/');
    },
    filename: (request, file, cb) => {
      cb(null, 'mofest_' + file.originalname);
    },
  }),
});

const applyMulter = (server: FastifyInstance): void => {
  server.register(multer.contentParser);
};

export default applyMulter;
