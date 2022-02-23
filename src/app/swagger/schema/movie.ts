const MovieSchema = {
  title: 'Movie',
  $id: 'http://example.com/schema/movie',
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    desc: { type: 'string' },
    duration: { type: 'number' },
    artists: { type: 'array', items: { type: 'string' } },
    url: { type: 'string' },
    genres: { type: 'array', items: { type: 'string' } },
  },
};

export default MovieSchema;
