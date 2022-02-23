import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import MovieHandler from '~/handler/movie';

const handler = container.resolve(MovieHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of all movies from database',
        summary: 'Get all movies',
        tags: ['Movies'],
        response: {
          200: {
            type: 'array',
            items: {
              $ref: 'http://example.com/schema/movie#',
            },
          },
        },
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const movies = await handler.getAll();

        return reply.send(movies);
      },
    },
  };
