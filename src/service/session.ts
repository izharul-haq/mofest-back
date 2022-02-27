import { singleton } from 'tsyringe';
import DatabaseClient from '~/database/prisma';
import { Session, SessionCreateInput } from '~/model/session';

@singleton()
class SessionService {
  constructor(private db: DatabaseClient) {
    console.log('Session service initialized');
  }

  public async create(data: SessionCreateInput): Promise<Session> {
    const session = await this.db.client.session.create({ data });

    return session;
  }

  public async getByUserID(id: string): Promise<Session[]> {
    const sessions = await this.db.client.session.findMany({
      where: {
        userId: id,
        isValid: true,
        expiredAt: { gte: new Date() },
      },
    });

    return sessions;
  }
}

export default SessionService;
