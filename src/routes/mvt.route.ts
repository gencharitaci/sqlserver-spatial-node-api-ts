// mvt.route.ts
// MSSQL için MVT rotası
import { FastifyPluginAsync } from "fastify";
import { mvtSchema } from "../schemas/mvt.schema";
import { mvtSql } from "../sql/mvt.sql";

const mvtRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/mvt/:table/:z/:x/:y",
    schema: mvtSchema,
    handler: async (request, reply) => {
      const { table, z, x, y } = request.params as {
        table: string;
        z: number;
        x: number;
        y: number;
      };

      const { geom_column, columns, id_column, filter } = request.query as {
        geom_column: string;
        columns?: string;
        id_column?: string;
        filter?: string;
      };

      // Table and column name validation
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return reply.code(400).send({ error: "Invalid table name." });
      }
      if (!/^[a-zA-Z0-9_]+$/.test(geom_column)) {
        return reply.code(400).send({ error: "Invalid geometry column name." });
      }

      try {
        // Construct SQL Query
        const query = mvtSql({ table, z, x, y }, { geom_column, columns, id_column, filter });

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);

        // Check if results exist
        if (!result.recordset.length) {
          return reply.code(204).send();
        }

        // Send the results as MVT
        await reply.header("Content-Type", "application/x-protobuf").send(result.recordset[0].geometry);
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default mvtRoute;
