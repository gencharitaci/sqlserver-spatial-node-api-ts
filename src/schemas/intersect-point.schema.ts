export const intersectPointSchema = {
    description: "Find features within a given distance of a point.",
    tags: ["api"],
    summary: "Find features near a point",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table containing geometries.",
        },
        point: {
          type: "string",
          pattern: "^(-?\\d+\\.?\\d*),(-?\\d+\\.?\\d*),(\\d{4})$",
          description: "Point in the format X,Y,SRID.",
        },
      },
      required: ["table", "point"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column: {
          type: "string",
          description: "Geometry column of the table.",
          default: "the_geom",
        },
        columns: {
          type: "string",
          description: "Columns to return.",
          default: "*",
        },
        filter: {
          type: "string",
          description: "Optional SQL WHERE conditions.",
        },
        distance: {
          type: "integer",
          description: "Buffer distance in the geometry column units.",
          default: 0,
        },
        sort: {
          type: "string",
          description: "Optional sort column(s).",
        },
        limit: {
          type: "integer",
          description: "Optional limit on the number of results.",
        },
      },
      required: ["geom_column", "columns", "distance"],
    },
  };
  