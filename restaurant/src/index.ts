import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaraunt.js";
import itemRoutes from "./routes/menuitem.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import cors from "cors";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { startPaymentConsumer } from "./config/payment.consumer.js";
import { register } from "./config/metric.js";
import { metricsMiddleware } from "./middlewares/metricmid.js";
import { configureCloudinary } from "@beltawn3507/common";

dotenv.config();

await connectRabbitMQ();
startPaymentConsumer();

configureCloudinary();

const app = express();

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ??
  "http://localhost:5173"
).split(",");

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
app.use(metricsMiddleware)

const PORT = process.env.PORT || 5001;


app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Restaurant service is running on port ${PORT}!!!`);
  connectDB();
});
