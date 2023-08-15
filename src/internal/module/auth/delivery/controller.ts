import { Request, Response } from "express";
import { generateToken } from "../../../../pkg/jwt"; // Pastikan Anda mengganti ini dengan path yang sesuai

export function login(req: Request, res: Response): void {
  // Lakukan autentikasi pengguna, misalnya dengan memeriksa username dan password

  console.log(req.body);
  const user = authenticateUser(req.body.username, req.body.password);

  if (!user) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  const payload = {
    userId: user.id,
    username: user.username,
  };

  const token = generateToken(payload);

  res.json({ token });
}

interface User {
  id: string;
  username: string;
  password: string;
}

// Sebagai contoh, inisialisasi daftar pengguna
const users: User[] = [
  { id: "1", username: "john_doe", password: "secret" },
  { id: "2", username: "jane_smith", password: "123456" },
  // ... tambahkan pengguna lainnya
];

export function authenticateUser(
  username: string,
  password: string
): User | undefined {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user;
}
