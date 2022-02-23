import { Client } from 'pg';
import { singleton } from 'tsyringe';
import env from '~/env';

@singleton()
class PostgresClient {
  public client;

  constructor() {
    this.client = new Client({ connectionString: env.database });
  }
}

export default PostgresClient;
