// nearest.schema.ts
// MSSQL için en yakın kayıtlar için şema
export const nearestSchema = {
    description:
      "Find the records closest to a point in order of distance. Note that if no limit is given, all records are returned.",
    tags: ["api"],
    summary: "Find records closest to a point",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table or view.",
        },
        point: {
          type: "string",
          pattern: "^(-?\\d+\\.?\\d+),(-?\\d+\\.?\\d+),(\\d+)$",
          description: "A point expressed as `X,Y,SRID`. Note: for Lng/Lat coordinates, Lng is X and Lat is Y.",
        },
      },
      required: ["table", "point"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column: {
          type: "string",
          description: "The geometry column of the table.",
          default: "the_geom",
        },
        columns: {
          type: "string",
          description: "Columns to return.",
          default: "*",
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
        limit: {
          type: "integer",
          description: "Limit the number of output features.",
          default: 10,
        },
      },
      required: ["geom_column", "columns"],
    },
  };
  