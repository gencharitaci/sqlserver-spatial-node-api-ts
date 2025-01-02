// nearest.route.ts
// MSSQL için en yakın kayıt rotası
import { FastifyPluginAsync } from "fastify";
import { nearestSchema } from "../schemas/nearest.schema";
import { nearestSql } from "../sql/nearest.sql";

const nearestRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/nearest/:table/:point",
    schema: nearestSchema,
    handler: async (request, reply) => {
      const { table, point } = request.params as { table: string; point: string };
      const { geom_column, columns, filter, limit } = request.query as {
        geom_column: string;
        columns: string;
        filter?: string;
        limit?: number;
      };

      // Table and column name validation
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }
      if (!/^[a-zA-Z0-9_]+$/.test(geom_column)) {
        return reply.code(400).send({ error: "Invalid geometry column name." });
      }

      try {
        // Construct SQL Query
        const query = nearestSql({ table, point }, { geom_column, columns, filter, limit });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (!result.recordset.length) {
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

export default nearestRoute;
