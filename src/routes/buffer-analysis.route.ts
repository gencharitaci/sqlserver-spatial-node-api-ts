// buffer-analysis.route.ts
import { FastifyPluginAsync } from "fastify";
import { bufferAnalysisSchema } from "../schemas/buffer-analysis.schema";
import { bufferAnalysisSql } from "../sql/buffer-analysis.sql";

const bufferAnalysisRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/buffer_analysis/:table",
    schema: bufferAnalysisSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, buffer_distance, columns, filter } = request.query as {
        geom_column: string;
        buffer_distance: number;
        columns?: string;
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
        const query = bufferAnalysisSql({ table }, { geom_column, buffer_distance, columns, filter });

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

export default bufferAnalysisRoute;

