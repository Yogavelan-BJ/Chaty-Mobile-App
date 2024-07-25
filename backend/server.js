import path from "path";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import usersRoutes from "./routes/users.routes.js";
import connectToMongoDB from "./DB/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

config();
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);
app.get("*", (req, res) => {
  res.send(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
