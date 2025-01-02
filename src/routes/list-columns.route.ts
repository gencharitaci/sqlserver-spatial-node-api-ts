import { FastifyPluginAsync } from "fastify";
import { listColumnsSchema } from "../schemas/list-columns.schema";
import { listColumnsSql } from "../sql/list-columns.sql";

const listColumnsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/list_columns/:table",
    schema: listColumnsSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };

      // Validate table name to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }

      try {
        // Construct SQL Query
        const query = listColumnsSql({ table });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (result.recordset.length === 0) {
          return reply.code(404).send({ error: "No columns found." });
        }

        // Send the results
        await reply.send(result.recordset);
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default listColumnsRoute;
