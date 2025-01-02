import { FastifyPluginAsync } from "fastify";
import { geojsonSchema } from "../schemas/geojson.schema";
import { geojsonSql } from "../sql/geojson.sql";

const geojsonRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/geojson/:table",
    schema: geojsonSchema,
    handler: async (request, reply) => {
      const { table } = request.params as { table: string };
      const { geom_column, columns, id_column, filter, bounds, precision } =
        request.query as {
          geom_column: string;
          columns?: string;
          id_column?: string;
          filter?: string;
          bounds?: string;
          precision?: number;
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
        const query = geojsonSql(
          { table },
          { geom_column, columns, id_column, filter, bounds, precision }
        );

        // Log the query for debugging
        fastify.log.info(`Executing query: ${query}`);

        // Execute the query
        const result = await fastify.db.request().query(query);
        console.log(result);

        // Check if results exist
        if (!result.recordset.length) {
          return reply.code(204).send();
        }

        // Create JSON object from result
        const json = {
          type: "FeatureCollection",
          features: result.recordset.map((row) => JSON.parse(row.geojson)),
        };

        // Send the results
        await reply.send(json);
        // return await reply.send(json);
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Database query error." });
      }
    },
  });
};

export default geojsonRoute;
