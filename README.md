# mofest-back

Backend-side for movie festival app.

## Notable Dependencies

1. [Fastify](https://www.fastify.io/)

2. [Prisma](https://www.prisma.io/)

3. [Husky](https://typicode.github.io/husky/#/)

4. [Commitlint](https://commitlint.js.org/#/)

## How to Use

0. Pre-running:

   - Install `node_modules` with `yarn install` command.

   - Copy `.env.example` file and rename it to `.env`.
  
   - Configure `.env` to match your system.

   - Migrate prisma schema to your database using `yarn migrate`.

1. Run application:

    - Use `yarn dev` to run application in development mode.

    - Use `yarn start` to run application in production mode.

2. API is ready to use.

## Note

For API documentation, refer to `<server address>/docs` (ex: `localhost:3000/docs`).
