import { Movie } from '@prisma/client';
import { singleton } from 'tsyringe';
import DatabaseClient from '~/database/prisma';

@singleton()
class MovieService {
  constructor(private db: DatabaseClient) {
    console.log('Movie service initialized');
  }

  public async getAll(): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany({
      include: {
        genre: {
          select: {
            name: true,
          },
        },
      },
    });

    return movies;
  }
}

export default MovieService;
