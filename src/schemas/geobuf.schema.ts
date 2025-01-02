export const geobufSchema = {
    description: "Return records as WKB, a binary encoding of geometry.",
    tags: ["feature"],
    summary: "Return WKB",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table or view.",
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
        columns: {
          type: "string",
          description: "Columns to return as GeoJSON properties.",
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
        bounds: {
          type: "string",
          pattern: "^-?[0-9]+(\\.?[0-9]+)?,?-?[0-9]+(\\.?[0-9]+)?$",
          description: "Optionally limit output to features that intersect a bounding box.",
        },
      },
    },
  };
  