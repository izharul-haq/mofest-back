import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import AuthHandler from '~/handler/auth';

const handler = container.resolve(AuthHandler);

export default (): Resource =>
  <Resource>{
    post: {
      schema: {
        description: 'Login to the system to get token',
        summary: 'Do login',
        tags: ['Auth'],

        body: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            password: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/auth#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Body: { userId: string; password: string } }>,
        reply: FastifyReply
      ) => {
        try {
          const payload = request.body;
          const authData = await handler.login(payload.userId, payload.password);

          return reply.send(authData);
        } catch (error) {
          const e = error as APIError;
          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
  };
