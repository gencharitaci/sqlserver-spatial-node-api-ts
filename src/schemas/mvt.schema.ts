// mvt.schema.ts
// MSSQL için MVT rotası şeması
export const mvtSchema = {
    description:
      "Return table as Mapbox Vector Tile (MVT). The layer name returned is the name of the table.",
    tags: ["feature"],
    summary: "Return MVT for a specific ZXY tile",
    params: {
      type: "object",
      properties: {
        table: {
          type: "string",
          description: "The name of the table or view to query.",
        },
        z: {
          type: "integer",
          description: "Z value of ZXY tile.",
        },
        x: {
          type: "integer",
          description: "X value of ZXY tile.",
        },
        y: {
          type: "integer",
          description: "Y value of ZXY tile.",
        },
      },
      required: ["table", "z", "x", "y"],
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
          description: "Optional columns to return with MVT.",
        },
        id_column: {
          type: "string",
          description:
            "Optional id column name for Mapbox GL Feature State. This column must be an integer or castable as an integer.",
        },
        filter: {
          type: "string",
          description: "Optional filter parameters for a SQL WHERE statement.",
        },
      },
      required: ["geom_column"],
    },
  };
  