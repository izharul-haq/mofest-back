import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import authorizeAdmin from '~/app/auth/authorizeAdmin';
import ViewHandler from '~/handler/view';

const handler = container.resolve(ViewHandler);

export default (): Resource =>
  <Resource>{
    delete: {
      schema: {
        description: 'Delete a view based on user ID and movie ID',
        summary: 'Delete a view',
        tags: ['View'],

        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            movieId: { type: 'number' },
          },
        },

        response: {
          200: {
            $ref: 'http://example.com/schema/view#',
          },
        },
      },
      preHandler: authorizeAdmin,
      handler: async (
        request: FastifyRequest<{ Params: { userId: string; movieId: number } }>,
        reply: FastifyReply
      ) => {
        try {
          const userId = request.params.userId;
          const movieId = parseInt(request.params.movieId.toString());
          const view = await handler.delete(userId, movieId);

          return reply.send(view);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
