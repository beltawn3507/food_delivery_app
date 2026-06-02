import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import { metricsMiddleware } from "./middlewares/metricmid.js";
import { register } from "./config/metric.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(metricsMiddleware);

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  connectDB();
});
