import { Movie } from '@prisma/client';
import { singleton } from 'tsyringe';
import DatabaseClient from '~/database/prisma';
import { MovieCreateInput, MovieUpdateInput } from '~/model/movie';

@singleton()
class MovieService {
  constructor(private db: DatabaseClient) {
    console.log('Movie service initialized');
  }

  public async getAll(): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany();

    return movies;
  }

  public async getByID(id: number): Promise<Movie | null> {
    const movie = await this.db.client.movie.findUnique({
      where: { id: id },
    });

    return movie;
  }

  public async getByTitle(title: string): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany({
      where: { title: title },
    });

    return movies;
  }

  public async getByDescription(desc: string): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany({
      where: { desc: desc },
    });

    return movies;
  }

  public async getByArtists(artists: string[]): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany({
      where: { artists: { hasSome: artists } },
    });

    return movies;
  }

  public async getByGenres(genres: string[]): Promise<Movie[]> {
    const movies = await this.db.client.movie.findMany({
      where: { genres: { hasSome: genres } },
    });

    return movies;
  }

  public async create(data: MovieCreateInput): Promise<Movie> {
    const movie = await this.db.client.movie.create({ data });

    return movie;
  }

  public async update(id: number, data: MovieUpdateInput): Promise<Movie> {
    const movie = await this.db.client.movie.update({
      where: { id: id },
      data: data,
    });

    return movie;
  }

  public async delete(id: number): Promise<Movie> {
    const movie = await this.db.client.movie.delete({
      where: { id: id },
    });

    return movie;
  }
}

export default MovieService;
