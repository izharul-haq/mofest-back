import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import ViewHandler from '~/handler/view';

const handler = container.resolve(ViewHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of views based on user ID',
        summary: 'Get user views',
        tags: ['View'],

        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/view#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply
      ) => {
        try {
          const userId = request.params.userId;
          const views = await handler.getUserView(userId);

          return reply.send(views);
        } catch (error) {
          const e = error as APIError;

          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
  };
