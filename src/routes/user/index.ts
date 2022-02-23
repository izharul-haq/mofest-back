import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import UserHandler from '~/handler/user';
import { UserCreateInput } from '~/model/user';

const handler = container.resolve(UserHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of all users from database',
        summary: 'Get all users',
        tags: ['User'],

        response: {
          '200': {
            type: 'array',
            items: {
              $ref: 'http://example.com/schema/user#',
            },
          },
        },
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const users = await handler.getAll();

        return reply.send(users);
      },
    },
    post: {
      schema: {
        description: 'Create a new user',
        summary: 'Create user',
        tags: ['User'],

        body: {
          type: 'object',
          required: ['id', 'name', 'email', 'password', 'role'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['USER', 'ADMIN'] },
          },
        },

        response: {
          201: {
            $ref: 'http://example.com/schema/user#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Body: UserCreateInput }>, reply: FastifyReply) => {
        const payload = request.body;
        const user = await handler.create(payload);

        return reply.send(user);
      },
    },
  };
