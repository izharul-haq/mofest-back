const ViewSchema = {
  title: 'View',
  $id: 'http://example.com/schema/view',
  type: 'object',
  properties: {
    userId: { type: 'string' },
    movieId: { type: 'number' },
    date: { type: 'string', format: 'date' },
    voted: { type: 'boolean' },
  },
};

export default ViewSchema;
