// Geometry Reprojection Route
import { FastifyPluginAsync } from "fastify";
import { reprojectSql } from "../sql/reproject.sql";
import { reprojectSchema } from "../schemas/reproject.schema";

const reprojectRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/reproject/:table",
    schema: reprojectSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, target_srid, filter } = request.query as {
        geom_column: string;
        target_srid: number;
        filter?: string;
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
        const query = reprojectSql(
          { table },
          { geom_column, target_srid, filter }
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

export default reprojectRoute;
