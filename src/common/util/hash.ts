import bcrypt from 'bcrypt';

export const getHash = (plaintext: string): string => {
  return bcrypt.hashSync(plaintext, 5);
};

export const verifyHash = (plaintext: string, hashedtext: string): boolean => {
  return bcrypt.compareSync(plaintext, hashedtext);
};
