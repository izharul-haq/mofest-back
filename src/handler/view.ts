import { singleton } from 'tsyringe';
import { View } from '~/model/view';
import ViewService from '~/service/view';

@singleton()
class ViewHandler {
  constructor(private viewService: ViewService) {}

  public getAll = async (): Promise<View[]> => {
    const views = await this.viewService.getAll();

    return views;
  };

  public getUserView = async (userId: string): Promise<View[]> => {
    const views = await this.viewService.getUserView(userId);

    return views;
  };

  public view = async (userId: string, movieId: number): Promise<View> => {
    const view = await this.viewService.view(userId, movieId);

    return view;
  };

  public vote = async (userId: string, movieId: number): Promise<View> => {
    const view = await this.viewService.vote(userId, movieId);

    return view;
  };

  public unvote = async (userId: string, movieId: number): Promise<View> => {
    const view = await this.viewService.unvote(userId, movieId);

    return view;
  };

  public delete = async (userId: string, movieId: number): Promise<View> => {
    const view = await this.viewService.delete(userId, movieId);

    return view;
  };
}

export default ViewHandler;
