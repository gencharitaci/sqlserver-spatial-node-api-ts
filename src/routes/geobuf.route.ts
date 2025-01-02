import { FastifyPluginAsync } from "fastify";
import { geobufSchema } from "../schemas/geobuf.schema";
import { geobufSql } from "../sql/geobuf.sql";

const geobufRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/geobuf/:table",
    schema: geobufSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, columns, filter, bounds } = request.query as {
        geom_column: string;
        columns?: string;
        filter?: string;
        bounds?: string;
      };

      // Validate table and column names
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }
      if (!/^[a-zA-Z0-9_]+$/.test(geom_column)) {
        return reply.code(400).send({ error: "Invalid geometry column name." });
      }

      try {
        // Construct SQL Query
        const query = geobufSql({ table }, { geom_column, columns, filter, bounds });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);
        console.log(result);


        if (!result.recordset.length) {
          return reply.code(204).send();
        }

        // Return WKB as binary
        await reply.header("Content-Type", "application/octet-stream").send(result.recordset[0].geom);
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default geobufRoute;