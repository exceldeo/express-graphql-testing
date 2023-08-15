import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwt";

interface UserPayload {
  id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}

export default authenticate;
