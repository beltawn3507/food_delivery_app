import { Request, Response, NextFunction } from "express";
import {
  httpRequestDuration,
  httpRequestsTotal,
} from "../config/metric.js";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);

    const duration =
      diff[0] + diff[1] / 1e9;

    const route =
      req.route?.path || req.path;

    httpRequestDuration
      .labels(
        req.method,
        route,
        res.statusCode.toString()
      )
      .observe(duration);

    httpRequestsTotal
      .labels(
        req.method,
        route,
        res.statusCode.toString()
      )
      .inc();
  });

  next();
};