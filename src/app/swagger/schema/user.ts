const UserSchema = {
  title: 'User',
  $id: 'http://example.com/schema/user',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'string', enum: ['USER', 'ADMIN'] },
  },
};

export default UserSchema;
