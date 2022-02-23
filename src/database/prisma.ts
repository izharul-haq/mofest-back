import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';
import env from '~/env';

@singleton()
class DatabaseClient {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      datasources: {
        db: {
          url: env.database,
        },
      },
    });
  }
}

export default DatabaseClient;
