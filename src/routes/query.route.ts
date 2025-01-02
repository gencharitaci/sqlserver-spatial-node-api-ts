// Query Route Handler

import { FastifyPluginAsync } from "fastify";
import { querySchema } from "../schemas/query.schema";
import { querySql } from "../sql/query.sql";

const queryRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/query/:table",
    schema: querySchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { columns, filter, group, sort, limit } = request.query as {
        columns: string;
        filter?: string;
        group?: string;
        sort?: string;
        limit?: number;
      };

      // Validate table and column names to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }

      try {
        // Construct SQL Query
        const query = querySql(
          { table },
          { columns, filter, group, sort, limit }
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

export default queryRoute;
