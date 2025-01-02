// Route Handler for List Tables
import { FastifyPluginAsync } from "fastify";
import { listTablesSchema } from "../schemas/list-tables.schema";
import { listTablesSql } from "../sql/list-tables.sql";

const listTablesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/list_tables",
    schema: listTablesSchema,
    handler: async (request, reply) => {
      const { filter } = request.query as { filter?: string };

      try {
        // Construct SQL Query
        const query = listTablesSql({ filter });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (result.recordset.length === 0) {
          return reply.code(404).send({ error: "No tables found." });
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

export default listTablesRoute;
