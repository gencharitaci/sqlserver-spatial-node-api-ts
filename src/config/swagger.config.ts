import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const withSwagger = (app: FastifyInstance) => {
  
  const isProduction = process.env.NODE_ENV === "production";

  app.register(fastifySwagger, {
    swagger: {
      basePath: process.env.API_PATH || "/",
      info: {
        title: "SQLSERVER SPATIAL NODE API Documentation",
        description:
          "Auto-generated API documentation for our spatial services.",
          version: process.env.npm_package_version || "1.0.0",
        contact: {
          name: "Adem Kurtipek",
          email: "ademkurtipek@hotmail.com",
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      },
      externalDocs: {
        url: "https://github.com/gencharitaci/sqlserver-spatial-node-api#readme",
        description: "README file & source code on Github",
      },
      // host: process.env.SWAGGER_HOST || "localhost:3000",
      // schemes: ["http"],
      // host: isProduction ? process.env.SWAGGER_HOST : "localhost:3000",
      host: isProduction
        ? process.env.SWAGGER_HOST || ""
        : "localhost:3000",
      schemes: isProduction
        ? process.env.SWAGGER_SCHEMES?.split(",") || ["https"]
        : ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "api", description: "Code related endpoints" },
        { name: "feature", description: "Spatial features in common formats for direct mapping." },
        { name: "meta", description: "Meta information for tables and views" },
      ],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    staticCSP: true,
    transformStaticCSP: (header) => header,
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  app.ready(() => {
    app.swagger();
  });
};
