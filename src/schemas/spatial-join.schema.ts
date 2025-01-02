// spatial-join.schema.ts
export const spatialJoinSchema = {
    description: "Return records from one table that intersect or are within a specific distance of another table.",
    tags: ["api"],
    summary: "Spatial join between two tables",
    params: {
      type: "object",
      properties: {
        table_from: {
          type: "string",
          description: "The name of the source table.",
        },
        table_to: {
          type: "string",
          description: "The name of the target table.",
        },
      },
      required: ["table_from", "table_to"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column_from: {
          type: "string",
          description: "The geometry column in the source table.",
          default: "the_geom",
        },
        geom_column_to: {
          type: "string",
          description: "The geometry column in the target table.",
          default: "the_geom",
        },
        columns: {
          type: "string",
          description: "Columns to return from both tables.",
        },
        distance: {
          type: "number",
          description: "The distance within which to find matches.",
          default: 0,
        },
        filter: {
          type: "string",
          description: "Optional SQL WHERE filter to refine the results.",
        },
      },
      required: ["geom_column_from", "geom_column_to"],
    },
  };
  