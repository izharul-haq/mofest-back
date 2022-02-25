import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { container } from 'tsyringe';
import MovieHandler from '~/handler/movie';
import { MovieCreateInput } from '~/model/movie';

const handler = container.resolve(MovieHandler);

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Get list of all movies from database',
        summary: 'Get all movies',
        tags: ['Movie'],

        response: {
          200: {
            type: 'array',
            items: {
              $ref: 'http://example.com/schema/movie#',
            },
          },
        },
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const movies = await handler.getAll();

        return reply.send(movies);
      },
    },
    post: {
      schema: {
        description: 'Create a new movie entry in the database',
        summary: 'Create movie entry',
        tags: ['Movie'],

        body: {
          type: 'object',
          required: ['title', 'desc', 'duration', 'artists', 'url', 'genres'],
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
          201: {
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      handler: async (request: FastifyRequest<{ Body: MovieCreateInput }>, reply: FastifyReply) => {
        try {
          const payload = request.body;
          const movie = await handler.create(payload);

          return reply.status(201).send(movie);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
