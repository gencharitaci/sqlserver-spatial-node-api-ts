import { FastifyPluginAsync } from "fastify";
import { centroidSchema } from "../schemas/centroid.schema";
import { centroidSql } from "../sql/centroid.sql";

// Centroid Route Handler
const centroidRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/centroid/:table",
    schema: centroidSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, srid, filter, force_on_surface } = request.query as {
        geom_column: string;
        srid: number;
        filter?: string;
        force_on_surface?: boolean;
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
        const query = centroidSql(
          { table },
          { geom_column, srid, filter, force_on_surface }
        );

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);
        console.log(result);

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

export default centroidRoute;
