import { singleton } from 'tsyringe';
import DatabaseClient from '~/database/prisma';
import { View } from '~/model/view';

@singleton()
class ViewService {
  constructor(private db: DatabaseClient) {
    console.log('View service initialized');
  }

  public async getAll(): Promise<View[]> {
    const views = await this.db.client.view.findMany();

    return views;
  }

  public async getUserView(userId: string): Promise<View[]> {
    const view = await this.db.client.view.findMany({
      where: {
        userId: userId,
      },
    });

    return view;
  }

  public async view(userId: string, movieId: number): Promise<View> {
    const view = await this.db.client.view.create({
      data: {
        userId: userId,
        movieId: movieId,
      },
    });

    return view;
  }

  public async vote(userId: string, movieId: number): Promise<View> {
    const view = await this.db.client.view.update({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
      data: {
        voted: true,
      },
    });

    return view;
  }

  public async unvote(userId: string, movieId: number): Promise<View> {
    const view = await this.db.client.view.update({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
      data: {
        voted: false,
      },
    });

    return view;
  }

  public async delete(userId: string, movieId: number): Promise<View> {
    const view = await this.db.client.view.delete({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });

    return view;
  }
}

export default ViewService;
