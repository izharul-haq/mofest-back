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
        description: 'Get a movie from database based on title',
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
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Querystring: { q: string } }>,
        reply: FastifyReply
      ) => {
        try {
          const title = request.query.q as string;
          const movie = await handler.getByTitle(title);

          return reply.send(movie);
        } catch (error) {
          const e = error as APIError;
          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
  };
