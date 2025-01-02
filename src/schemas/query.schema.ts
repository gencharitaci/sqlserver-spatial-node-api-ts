// Query Route Schema
export const querySchema = {
    description: "Query a table or view.",
    tags: ["api"],
    summary: "Table query",
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
        columns: {
          type: "string",
          description: "Columns to return.",
          default: "*",
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
        sort: {
          type: "string",
          description: "Optional sort by column(s).",
        },
        limit: {
          type: "integer",
          description: "Optional limit to the number of output features.",
          default: 100,
        },
        group: {
          type: "string",
          description: "Optional column(s) to group by.",
        },
      },
    },
  };