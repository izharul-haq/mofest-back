import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import APIError from '~/common/error/error';
import MovieHandler from '~/handler/movie';
import { MovieUpdateInput } from '~/model/movie';

const handler = container.resolve(MovieHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get a movie from database based on ID',
        summary: 'Get movie by ID',
        tags: ['Movie'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
          const id = request.params.id.toString();
          const movie = await handler.getByID(parseInt(id));

          return reply.send(movie);
        } catch (error) {
          const e = error as APIError;
          return reply.status(e.statusCode).send(e.message);
        }
      },
    },
    put: {
      schema: {
        description: 'Update a movie from database based on ID',
        summary: 'Update movie by ID',
        tags: ['Movie'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },

        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            desc: { type: 'string' },
            duration: { type: 'number' },
            artists: { type: 'array', items: { type: 'string' } },
            genre: { type: 'array', items: { type: 'string' } },
            url: { type: 'string' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      handler: async (
        request: FastifyRequest<{ Params: { id: string }; Body: MovieUpdateInput }>,
        reply: FastifyReply
      ) => {
        try {
          const id = request.params.id.toString();
          const payload = request.body;

          const movie = await handler.update(parseInt(id), payload);

          return reply.send(movie);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
    delete: {
      schema: {
        description: 'Delete a movie from database based on ID',
        summary: 'Delete movie by ID',
        tags: ['Movie'],

        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },

        response: {
          '200': {
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
        try {
          const id = request.params.id.toString();
          const movie = await handler.delete(parseInt(id));

          return reply.send(movie);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
