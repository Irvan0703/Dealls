import {  Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import  config  from "../app/config";

export function isAuthenticated(req: any, res: Response, next: NextFunction) : void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
     res.status(401).json({ message: 'No token provided' });
  }
  if (!config.secret_key) {
     res.status(500).json({ message: 'JWT Secret is not defined in the config.' });
     return; 
  }

  jwt.verify(token, config.secret_key, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}