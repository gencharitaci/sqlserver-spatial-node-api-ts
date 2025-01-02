import { FastifyInstance } from "fastify";
import compress from "@fastify/compress";

export const registerCompress = (app: FastifyInstance) => {
  app.register(compress, {
    global: true,
    encodings: ["gzip", "deflate", "br"],
    customTypes: /x-protobuf$/,
    // threshold: 1024, // Only compress responses larger than 1 KB
  });

  app.log.info("Compression is enabled with custom handling for x-protobuf.");
};
