export const intersectFeatureSchema = {
    description: "Find intersecting features within a given distance.",
    tags: ["api"],
    summary: "Find features intersecting within a distance buffer.",
    params: {
      type: "object",
      properties: {
        table_from: {
          type: "string",
          description: "The table containing the geometry to buffer and compare.",
        },
        table_to: {
          type: "string",
          description: "The table containing geometries to intersect with.",
        },
      },
      required: ["table_from", "table_to"],
    },
    querystring: {
      type: "object",
      properties: {
        geom_column_from: {
          type: "string",
          description: "Geometry column of the `from_table`. Default: geom.",
          default: "the_geom",
        },
        geom_column_to: {
          type: "string",
          description: "Geometry column of the `to_table`. Default: geom.",
          default: "the_geom",
        },
        columns: {
          type: "string",
          description:
            "Columns to return. Use table prefixes for clarity. Default: *",
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
      required: ["geom_column_from", "geom_column_to", "columns"],
    },
  };
  