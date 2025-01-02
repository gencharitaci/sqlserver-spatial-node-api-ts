// transform-point.route.ts
// MSSQL için nokta dönüştürme rotası
import { FastifyPluginAsync } from "fastify";
import { transformPointSchema } from "../schemas/transform-point.schema";
import { transformPointSql } from "../sql/transform-point.sql";

const transformPointRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/transform_point/:point",
    schema: transformPointSchema,
    handler: async (request, reply) => {
      const { point } = request.params as { point: string };
      const { srid } = request.query as { srid: number };

      // Validate the point format
      if (!/^(-?\d+\.?\d+),(-?\d+\.?\d+),(\d+)$/.test(point)) {
        return reply.code(400).send({ error: "Invalid point format." });
      }

      try {
        // Construct SQL Query
        const query = transformPointSql({ point }, { srid });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (!result.recordset.length) {
          return reply.code(404).send({ error: "No records found." });
        }

        // Send the results
        await reply.send(result.recordset[0]);
        // return result.recordset;
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default transformPointRoute;
