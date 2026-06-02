import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import riderRoutes from "./routes/rider.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { startOrderReadyConsumer } from "./config/orderReady.consumer.js";
import { metricsMiddleware } from "./middlewares/metricmid.js";
import { register } from "./config/metric.js";

dotenv.config();

await connectRabbitMQ();
startOrderReadyConsumer();

const app = express();
app.use(express.json());
app.use(cors());

app.use(metricsMiddleware);

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.use("/api/rider", riderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Rider service is running on port ${process.env.PORT}`);
  connectDB();
});
