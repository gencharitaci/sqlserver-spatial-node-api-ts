// bbox (Bounding Box) Route Handler
import { FastifyPluginAsync } from "fastify";
import { bboxSchema } from "../schemas/bbox.schema";
import { bboxSql } from "../sql/bbox.sql";


const bboxRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/bbox/:table",
    schema: bboxSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, filter } = request.query as { geom_column: string; filter?: string };

      // Validate table and column names to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }
      if (!/^[a-zA-Z0-9_]+$/.test(geom_column)) {
        return reply.code(400).send({ error: "Invalid geometry column name." });
      }

      try {
        // Construct SQL Query
        const query = bboxSql({ table }, { geom_column, filter });

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

export default bboxRoute;

export const autoPrefix = "/v1";
