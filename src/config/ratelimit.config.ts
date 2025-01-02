import { FastifyInstance } from "fastify";
import rateLimit from "@fastify/rate-limit";

export const registerRateLimit = (app: FastifyInstance) => {
  const RATE_MAX = parseInt(process.env.RATE_MAX || "100", 10);

  app.register(rateLimit, {
    max: RATE_MAX,
    timeWindow: "1 minute",
    keyGenerator: (request) => request.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please wait before making more requests.",
    }),
    ban: 3,
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
    },
  });
};
