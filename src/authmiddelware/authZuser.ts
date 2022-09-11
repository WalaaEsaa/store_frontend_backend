import express, { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretToken = process.env.SECRET_TOKEN as unknown as string;
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authzHeader = (req.headers.authorization as string) || ' ';
    // console.log('auth ' + authzHeader)
    const token = authzHeader.split(' ')[1];
    // console.log('token: ' + token)
    //  console.log('secretToken: ' + secretToken)
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const verified = jwt.verify(token, secretToken);
    req.body = verified;
    // console.log(verified)
    next();
  } catch (err) {
    res.status(401);
    res.json(`token requir ${err}`);
  }
};
export default verifyAuthToken;
