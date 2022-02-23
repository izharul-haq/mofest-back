import { singleton } from 'tsyringe';
import { Movie } from '~/model/movie';
import MovieService from '~/service/movie';

@singleton()
class MovieHandler {
  constructor(private movieService: MovieService) {}

  public getAll = async (): Promise<Movie[]> => {
    const movies = await this.movieService.getAll();

    return movies;
  };
}

export default MovieHandler;
