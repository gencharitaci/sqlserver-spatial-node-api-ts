import Fastify from "fastify";
import dotenv from "dotenv";
import autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import { join } from "path";
import customMSSQLPlugin from "./config/db.config";
import { withSwagger } from "./config/swagger.config";
import { registerRateLimit } from "./config/ratelimit.config";
import { registerCaching } from "./config/cache.config";
import { registerCompress } from "./config/compress.config";

dotenv.config();

const start = async () => {
  const app = Fastify({
    logger: true,
    // ajv: {
    //   customOptions: {
    //     strict: false, // Bilinmeyen anahtarlar için strict modu devre dışı birak    //   },
    // },
  });

  // ERROR HANDLING / Global Error Handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(`Error: ${error.message}`);
    reply.status(400).send({
      error: "Invalid request",
      details: error.message,
    });
  });

  try {
    // PLUGINS - Register MSSQL
    app.register(customMSSQLPlugin);

    // PLUGINS - COMPRESSION
    registerCompress(app);

    // PLUGINS - CACHE SETTINGS
    registerCaching(app);

    // PLUGINS - CORS
    app.register(cors, { origin: "*" });

    // PLUGINS - RATE LIMITER (OPTIONAL)
    registerRateLimit(app);

    // Register Swagger / Swagger-UI
    withSwagger(app);

    // ROUTES - Default API Root
    app.get("/", async (request, reply) => {
      reply.send({
        message: "Welcome to the SQLSERVER SPATIAL NODE API",
        version: process.env.npm_package_version || "1.0.0",
      });
    });

    // app.ready(() => {
    //   app.log.info(app.printRoutes());
    // });
    
    // ROUTES - Use autoload for automatically registering routes
    app.register(autoload, {
      dir: join(__dirname, "routes"),
      options: {
        prefix: process.env.API_PREFIX || "/api/v1",
      },
    });

    // SERVER - START THE SERVER
    const PORT = parseInt(process.env.PORT || "3000", 10);
    await app.listen({ port: PORT });
    app.log.info(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
