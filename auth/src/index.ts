import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import cors from "cors";

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

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  connectDB();
});
