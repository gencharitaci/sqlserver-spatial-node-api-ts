// Schema for SRID Validation Route
export const sridValidationSchema = {
    description: "Validate an SRID against the spatial reference catalog.",
    tags: ["api"],
    summary: "Validate SRID",
    params: {
      type: "object",
      properties: {
        srid: {
          type: "integer",
          description: "The SRID to validate.",
        },
      },
      required: ["srid"],
    },
  };
  