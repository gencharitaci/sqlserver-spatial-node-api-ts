// buffer-analysis.schema.ts
export const bufferAnalysisSchema = {
    description: "Create buffers around geometries and return affected features.",
    tags: ["api"],
    summary: "Buffer analysis",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table to analyze.",
        },
      },
      required: ["table"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column: {
          type: "string",
          description: "The geometry column to use for buffer creation.",
          default: "the_geom",
        },
        buffer_distance: {
          type: "number",
          description: "The buffer distance (in the units of the geometry's SRID).",
          default: 1000,
        },
        columns: {
          type: "string",
          description: "Columns to return in the result set.",
          default: "*",
        },
        filter: {
          type: "string",
          description: "Optional SQL WHERE filter.",
        },
      },
      required: ["geom_column", "buffer_distance"],
    },
  };
  