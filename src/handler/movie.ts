import { singleton } from 'tsyringe';
import APIError from '~/common/error/error';
import { Movie, MovieCreateInput, MovieUpdateInput } from '~/model/movie';
import MovieService from '~/service/movie';

@singleton()
class MovieHandler {
  constructor(private movieService: MovieService) {}

  public getAll = async (): Promise<Movie[]> => {
    const movies = await this.movieService.getAll();

    return movies;
  };

  public getByID = async (id: number): Promise<Movie> => {
    const movie = await this.movieService.getByID(id);

    if (movie) {
      return movie;
    } else {
      throw new APIError(404, 'Movie not found');
    }
  };

  public getByTitle = async (title: string): Promise<Movie> => {
    const movie = await this.movieService.getByTitle(title);

    if (movie) {
      return movie;
    } else {
      throw new APIError(404, 'Movie not found');
    }
  };

  public getByDescription = async (desc: string): Promise<Movie[]> => {
    const movies = await this.movieService.getByDescription(desc);

    return movies;
  };

  public getByArtists = async (artists: string[]): Promise<Movie[]> => {
    const movies = await this.movieService.getByArtists(artists);

    return movies;
  };

  public getByGenres = async (genres: string[]): Promise<Movie[]> => {
    const movies = await this.movieService.getByGenres(genres);

    return movies;
  };

  public create = async (data: MovieCreateInput) => {
    const movie = await this.movieService.create(data);

    return movie;
  };

  public update = async (id: number, data: MovieUpdateInput) => {
    const movie = await this.movieService.update(id, data);

    return movie;
  };

  public delete = async (id: number): Promise<Movie> => {
    const movie = await this.movieService.delete(id);

    return movie;
  };
}

export default MovieHandler;
