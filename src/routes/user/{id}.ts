import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import UserHandler from '~/handler/user';
import { UserCreateInput } from '~/model/user';

const handler = container.resolve(UserHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get user from database based on ID',
        summary: 'Get user by ID',
        tags: ['User'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/user#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
          const id = request.params.id as string;
          const user = await handler.getByID(id);

          return reply.send(user);
        } catch (error) {
          const e = error as APIError;

          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
    put: {
      schema: {
        description: 'Update user from database based on ID',
        summary: 'Update user by ID',
        tags: ['User'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },

        body: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/user#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Params: { id: string }; Body: UserCreateInput }>,
        reply: FastifyReply
      ) => {
        try {
          const id = request.params.id as string;
          const payload = request.body;

          const user = await handler.update(id, payload);

          return reply.send(user);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
    delete: {
      schema: {
        description: 'Delete user from database based on ID',
        summary: 'Delete user by ID',
        tags: ['User'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/user#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
          const id = request.params.id as string;
          const user = await handler.delete(id);

          return reply.send(user);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
