export const geojsonSchema = {
    description: "Return table as GeoJSON.",
    tags: ["feature"],
    summary: "Return GeoJSON",
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
        id_column: {
          type: "string",
          description: "Optional ID column to use as GeoJSON feature ID.",
        },
        filter: {
          type: "string",
          description: "Optional filter for a SQL WHERE statement.",
        },
        bounds: {
          type: "string",
          pattern:
            "^-?[0-9]{0,20}.?[0-9]{1,20}?(,-?[0-9]{0,20}.?[0-9]{1,20}?){2,3}$",
          description:
            "Optional bounding box to limit features (sw.lng, sw.lat, ne.lng, ne.lat).",
        },
        precision: {
          type: "integer",
          description: "Maximum decimal precision for geometry. Default is 9.",
          default: 9,
        },
      },
    },
  };
  