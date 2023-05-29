import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.headers.authorization)
    throw new UnauthorizedException('Token missing in request.');
  try {
    const Secret = process.env.SecretKey;
    const decoded = jwt.verify(request.headers.authorization, Secret);
    response.locals.userInfo = decoded;
    return next();
  } catch (error) {
    throw new UnauthorizedException('Invalid token.');
  }
}
