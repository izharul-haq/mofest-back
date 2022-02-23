import 'reflect-metadata';
import intializeApp from './app/index';
import env from './env';

(async (): Promise<void> => {
  const server = await intializeApp();
  await server.listen(env.port, '0.0.0.0');
  console.log(`Server is listening at ${env.port}`);
})();
