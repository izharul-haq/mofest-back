import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import MovieHandler from '~/handler/movie';

const handler = container.resolve(MovieHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of movies from database based on description',
        summary: 'Get movies by description',
        tags: ['Movie'],

        querystring: {
          type: 'object',
          properties: {
            desc: {
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
        try {
          const desc = request.query.q as string;
          const movies = await handler.getByDescription(desc);

          return reply.send(movies);
        } catch (error) {
          const e = error as APIError;

          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
  };
