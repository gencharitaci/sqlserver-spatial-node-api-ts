// Route for SRID Validation
import { FastifyPluginAsync } from "fastify";
import { sridValidationSchema } from "../schemas/srid-validation.schema";
import { sridValidationSql } from "../sql/srid-validation.sql";

const sridValidationRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/validate-srid/:srid",
    schema: sridValidationSchema,
    handler: async (request, reply) => {
      const { srid } = request.params as { srid: number };

      try {
        // Construct SQL Query
        const query = sridValidationSql({ srid });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if SRID exists
        if (result.recordset.length === 0) {
          return reply
            .code(404)
            .send({ error: `SRID ${srid} is not defined in the catalog.` });
        }

        // Send the SRID details
        await reply.send(result.recordset[0]);
        // return result.recordset;
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default sridValidationRoute;
