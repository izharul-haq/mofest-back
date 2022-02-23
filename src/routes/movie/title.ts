import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import MovieHandler from '~/handler/movie';

const handler = container.resolve(MovieHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of movies from database based on title',
        summary: 'Get movies by title',
        tags: ['Movie'],

        querystring: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
          },
        },

        response: {
          '200': {
            type: 'array',
            items: {
              $ref: 'http://example.com/schema/movie#',
            },
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Querystring: { q: string } }>,
        reply: FastifyReply
      ) => {
        const title = request.query.q as string;
        const movies = await handler.getByTitle(title);

        return reply.send(movies);
      },
    },
  };
