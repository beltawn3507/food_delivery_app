import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { initSocket } from "./socket.js";
import internalRoute from "./routes/internal.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://food.dev",
  "https://food.dev",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // like mobile apps or postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

app.use("/api/v1/internal", internalRoute);

const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Realtime service is running port ${process.env.PORT}`);
});
