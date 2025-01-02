// bbox (Bounding Box) Route Schema
export const bboxSchema = {
    description: "Gets the bounding box of a feature(s).",
    tags: ["api"],
    summary: "Retrieve the bounding box for features.",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table to query.",
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
        filter: {
          type: "string",
          description: "Optional filter for SQL WHERE clause.",
        },
      },
      required: ["geom_column"],
    },
  };