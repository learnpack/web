import express from "express";
import authRoutes from "../server/auth.js";
import { createContactRouter } from "../server/contact.js";

// Vercel entry point: the same API routes as server/routes.ts, without the
// long-running HTTP server. Static files and /content are served by Vercel.
const app = express();
// The hosting proxy is the final hop; use its client IP for contact rate limits.
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", createContactRouter());

export default app;
