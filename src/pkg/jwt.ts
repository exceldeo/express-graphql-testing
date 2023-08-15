import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwt"; // Pastikan Anda mengganti ini dengan path yang sesuai

interface UserPayload {
  userId: string;
  username: string;
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}
