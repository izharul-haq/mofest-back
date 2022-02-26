import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import authorizeAdmin from '~/app/auth/authorizeAdmin';
import ViewHandler from '~/handler/view';

const handler = container.resolve(ViewHandler);

export default (): Resource =>
  <Resource>{
    delete: {
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
