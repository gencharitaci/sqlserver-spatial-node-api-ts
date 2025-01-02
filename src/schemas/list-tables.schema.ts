// Schema for List Tables Route
export const listTablesSchema = {
    description:
      "List tables and views in the database.",
    tags: ["meta"],
    summary: "List tables",
    querystring: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
      },
    },
  };
  