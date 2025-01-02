// within-radius.schema.ts
export const withinRadiusSchema = {
    description: "Find records within a specific radius of a point.",
    tags: ["api"],
    summary: "Find records within a radius",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table or view to query.",
        },
        point: {
          type: "string",
          pattern: "^(-?\\d+\\.?\\d*),(-?\\d+\\.?\\d*),(\\d+)$",
          description: "A point expressed as <em>X,Y,SRID</em>. X = Longitude, Y = Latitude.",
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
        radius: {
          type: "number",
          description: "The radius to search within (in meters).",
          default: 1000,
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
        limit: {
          type: "number",
          description: "Optional limit to the number of results.",
        },
      },
      required: ["geom_column", "radius"],
    },
  };
  