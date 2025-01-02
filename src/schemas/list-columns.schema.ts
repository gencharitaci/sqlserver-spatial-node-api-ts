export const listColumnsSchema = {
    description: "Returns a list of columns in the specified table.",
    tags: ["meta"],
    summary: "List table columns",
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
  };
  