import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import ViewHandler from '~/handler/view';
import { ViewCreateInput } from '~/model/view';

const handler = container.resolve(ViewHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of all views from database',
        summary: 'Get all views',
        tags: ['View'],

        response: {
          '200': {
            $ref: 'http://example.com/schema/view#',
          },
        },
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const views = await handler.getAll();

          return reply.send(views);
        } catch (error) {
          const e = error as APIError;

          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
    post: {
      schema: {
        description: 'Create a new view',
        summary: 'Create view',
        tags: ['View'],

        body: {
          type: 'object',
          required: ['userId', 'movieId'],
          properties: {
            userId: { type: 'string' },
            movieId: { type: 'number' },
            date: { type: 'string', format: 'date' },
            voted: { type: 'boolean' },
          },
        },

        response: {
          201: {
            $ref: 'http://example.com/schema/view#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Body: ViewCreateInput }>, reply: FastifyReply) => {
        try {
          const payload = request.body;
          const view = await handler.view(payload.userId, payload.movieId);

          return reply.send(view);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
