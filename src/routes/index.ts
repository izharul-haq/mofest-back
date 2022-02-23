import { Resource } from 'fastify-autoroutes';

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        description: 'Health check to make sure backend is responsive',
        summary: 'Health check',
        tags: ['Health'],

        response: {
          '200': {
            type: 'string',
          },
        },
      },
      handler: async () => 'OK',
    },
  };
