import { FastifyInstance } from "fastify";
import caching, { FastifyCachingPluginOptions } from "@fastify/caching";

export const registerCaching = (app: FastifyInstance) => {
  // Register caching plugin
  app.register<FastifyCachingPluginOptions>(caching, {
    privacy:
      (process.env.CACHE_PRIVACY as "public" | "private" | "no-cache") ||
      "private",
    expiresIn: parseInt(process.env.CACHE_EXPIRESIN || "3600", 10),
    serverExpiresIn: parseInt(process.env.CACHE_SERVERCACHE || "60", 10),
  });

  // GLOBAL onSend HOOK for Cache-Control headers
  const CACHE_MAXAGE = parseInt(process.env.CACHE_MAXAGE || "3600", 10);
  
  app.addHook("onSend", async (request, reply, payload) => {
    reply.header("Cache-Control", `private, max-age=${CACHE_MAXAGE}`);
    // app.log.info(`Response size: ${Buffer.byteLength(payload as string)} bytes`);

    // Default Fallback Payload
    // If your route doesn't return a payload for some reason, ensure there’s a default:
    if (!payload) {
      payload = JSON.stringify({ error: "No content" });
      reply.code(204); // Set status code for No Content
    }
    
    return payload;
  });
};
