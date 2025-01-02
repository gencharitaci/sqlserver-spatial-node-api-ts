// within-radius.route.ts
import { FastifyPluginAsync } from "fastify";
import { withinRadiusSchema } from "../schemas/within-radius.schema";
import { withinRadiusSql } from "../sql/within-radius.sql";

const withinRadiusRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/within_radius/:table/:point",
    schema: withinRadiusSchema,
    handler: async (request, reply) => {
      const { table, point } = request.params as { table: string; point: string };
      const { geom_column, radius, columns, filter, limit } = request.query as {
        geom_column: string;
        radius: number;
        columns?: string;
        filter?: string;
        limit?: number;
      };

      // Validate table and column names to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }

      if (!/^[a-zA-Z0-9_]+$/.test(geom_column)) {
        return reply.code(400).send({ error: "Invalid geometry column name." });
      }

      try {
        // Construct SQL Query
        const query = withinRadiusSql({ table, point }, { geom_column, radius, columns, filter, limit });

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

export default withinRadiusRoute;