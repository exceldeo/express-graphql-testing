import { Router } from "express";
import { login } from "./controller"; // Pastikan Anda mengganti ini dengan path yang sesuai

const authRouters = Router();

authRouters.post("/login", login);

export default authRouters;
