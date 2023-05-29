import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

type ITokenDataType = {
  id: string;
  email: string;
};

export default async function createJWTToken(data: ITokenDataType) {
  const SecretKey = process.env.SecretKey;
  return jwt.sign({ data }, SecretKey, {
    expiresIn: '30d',
  });
}
