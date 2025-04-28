import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

const secret = process.env.JWT_SECRET_KEY || '';
const expiration = '1h';

export function signToken(user: { username: string; email: string; _id: unknown }) {
  const payload = { username: user.username, email: user.email, _id: user._id };
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

// ⭐ Apollo Server GraphQL Middleware
export async function authMiddleware({ req }: { req: any }) {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body?.token || req.query?.token || req.headers?.authorization;

  if (req.headers?.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { _id, username, email } = jwt.verify(token, secret) as JwtPayload;
    req.user = { _id, username, email };
  } catch (err) {
    console.error('Invalid token', err);
  }

  return req;
}
