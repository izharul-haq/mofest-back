import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import ViewHandler from '~/handler/view';

const handler = container.resolve(ViewHandler);

export default (): Resource =>
  <Resource>{
    put: {
      schema: {
        description: 'Give vote for a movie based on ID from user based on ID',
        summary: 'Vote for movie',
        tags: ['View'],

        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            movieId: { type: 'number' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/view#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Params: { userId: string; movieId: number } }>,
        reply: FastifyReply
      ) => {
        try {
          const userId = request.params.userId;
          const movieId = request.params.movieId;
          const view = await handler.vote(userId, movieId);

          return reply.send(view);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
