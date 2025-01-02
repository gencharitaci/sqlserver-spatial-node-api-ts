// Intersect Feature Route Handler

import { FastifyPluginAsync } from "fastify";
import { intersectFeatureSchema } from "../schemas/intersect-feature.schema";
import { intersectFeatureSql } from "../sql/intersect-feature.sql";

const intersectFeatureRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/intersect_feature/:table_from/:table_to",
    schema: intersectFeatureSchema,
    handler: async (request, reply) => {
      const { table_from, table_to } = request.params as {
        table_from: string;
        table_to: string;
      };
      const {
        geom_column_from,
        geom_column_to,
        columns,
        filter,
        distance,
        sort,
        limit,
      } = request.query as {
        geom_column_from: string;
        geom_column_to: string;
        columns: string;
        filter?: string;
        distance?: number;
        sort?: string;
        limit?: number;
      };

      // Validate table and column names to prevent SQL injection
      if (
        !/^[a-zA-Z0-9_]+$/.test(table_from) ||
        !/^[a-zA-Z0-9_]+$/.test(table_to)
      ) {
        return reply.code(400).send({ error: "Invalid table name(s)." });
      }

      try {
        // Construct SQL Query
        const query = intersectFeatureSql(
          { table_from, table_to },
          {
            geom_column_from,
            geom_column_to,
            columns,
            filter,
            distance,
            sort,
            limit,
          }
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

export default intersectFeatureRoute;
