import client from 'prom-client'


const register  = new client.Registry();

client.collectDefaultMetrics({
    register,
    prefix: "food_"
})

export const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTPP requets duration in seconds",
    labelNames: ["method","route","status_code"],
    buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5]
})

export const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total http Requests",
    labelNames:["method","route","status_code"]
})

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);

export {register};