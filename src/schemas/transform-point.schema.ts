// transform-point.schema.ts
// MSSQL için nokta dönüştürme şeması
export const transformPointSchema = {
    description: "Transform a point to a different coordinate system.",
    tags: ["api"],
    summary: "Transform a point to a new SRID",
    params: {
      type: "object",
      properties: {
        point: {
          type: "string",
          pattern: "^(-?\\d+\\.?\\d+),(-?\\d+\\.?\\d+),(\\d+)$",
          description:
            "A point expressed as `X,Y,SRID`. Note for Lng/Lat coordinates, Lng is X and Lat is Y.",
        },
      },
      required: ["point"],
    },
    querystring: {
      type: "object",
      properties: {
        srid: {
          type: "integer",
          description: "The SRID of the coordinate system to return the point in.",
          default: 4326,
        },
      },
      required: ["srid"],
    },
  };
  