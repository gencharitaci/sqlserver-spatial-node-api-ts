import { FastifyPluginAsync } from "fastify";
import { intersectPointSchema } from "../schemas/intersect-point.schema";
import { intersectPointSql } from "../sql/intersect-point.sql";

const intersectPointRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/intersect_point/:table/:point",
    schema: intersectPointSchema,
    handler: async (request, reply) => {
      const { table, point } = request.params as { table: string; point: string };
      const { geom_column, columns, filter, distance, sort, limit } = request.query as {
        geom_column: string;
        columns: string;
        filter?: string;
        distance: number;
        sort?: string;
        limit?: number;
      };

      // Validate table and column names to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }

      try {
        // Construct SQL Query
        const query = intersectPointSql(
          { table, point },
          { geom_column, columns, filter, distance, sort, limit }
        );

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (result.recordset.length === 0) {
          return reply.code(404).send({ error: "No records found." });
        }

        // Send the results
        await reply.send(result.recordset);
        // return result.recordset;
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default intersectPointRoute;
