const AuthSchema = {
  title: 'Auth',
  $id: 'http://example.com/schema/auth',
  type: 'object',
  properties: {
    token: { type: 'string' },
    exp: { type: 'number' },
    role: { type: 'string', enum: ['USER', 'ADMIN'] },
    userId: { type: 'string' },
    name: { type: 'string' },
  },
};

export default AuthSchema;
