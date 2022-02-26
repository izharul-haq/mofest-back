import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import { MultipartFile } from 'fastify-multipart';
import { container } from 'tsyringe';
import authorizeAdmin from '~/app/auth/authorizeAdmin';
import { upload } from '~/app/multer';
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
        consumes: ['multipart/form-data'],

        response: {
          201: {
            $ref: 'http://example.com/schema/movie#',
          },
        },
      },
      preHandler: [authorizeAdmin, upload.single('file')],
      handler: async (
        request: FastifyRequest<{
          Body: {
            title: string;
            desc: string;
            duration: number;
            artists: string[];
            genres: string[];
            file: MultipartFile;
          };
        }>,
        reply: FastifyReply
      ) => {
        try {
          const payload = request.body;
          const file = request.file;
          const fileUrl = (file as never)['path' as keyof never];
          const movieInput = { ...payload, url: fileUrl } as MovieCreateInput;
          movieInput.duration = parseInt(movieInput.duration.toString());

          const movie = await handler.create(movieInput);

          return reply.status(201).send(movie);
        } catch (error) {
          return reply.status(400).send((error as Error).message);
        }
      },
    },
  };
