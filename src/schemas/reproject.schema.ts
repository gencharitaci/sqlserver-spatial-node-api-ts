// Schema for Geometry Reprojection Route
export const reprojectSchema = {
    description: "Reproject geometries into a different SRID.",
    tags: ["api"],
    summary: "Reproject geometries",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table containing the geometries.",
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
        target_srid: {
          type: "integer",
          description: "The SRID to reproject the geometries into.",
          default: 4326,
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
      },
      required: ["geom_column", "target_srid"],
    },
  };
  