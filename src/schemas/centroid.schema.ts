// centroid Route Schema
export const centroidSchema = {
    description: "Get the centroids of feature(s).",
    tags: ["api"],
    summary: "Feature(s) centroids",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table or view to query.",
        },
      },
      required: ["table"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column: {
          type: "string",
          description: "The geometry column of the table.",
          default: "the_geom",
        },
        srid: {
          type: "integer",
          description: "The SRID for the returned centroids.",
          default: 4326,
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
        force_on_surface: {
          type: "boolean",
          description: "Set <em>true</em> to force point on surface. The default is <em>false</em>.",
          default: false,
        },
      },
    },
  };