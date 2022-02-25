import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import path from 'path';

export default (): Resource =>
  <Resource>{
    post: {
      schema: {
        description: 'Upload movie to the server',
        summary: 'Upload movie',
        tags: ['Movie'],
        consumes: ['multipart/form-data'],

        response: {
          '201': {
            type: 'object',
            properties: {
              url: { type: 'string' },
            },
          },
        },
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const file = await request.file();
        console.log(file.filename);
        const fileUrl = path.join(__dirname + '../../../upload', file.filename);

        return reply.status(201).send({
          url: fileUrl,
        });
      },
    },
  };
