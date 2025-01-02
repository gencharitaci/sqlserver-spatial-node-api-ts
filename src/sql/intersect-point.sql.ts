export const intersectPointSql = (
    params: { table: string; point: string },
    query: {
      geom_column: string;
      columns: string;
      filter?: string;
      distance: number;
      sort?: string;
      limit?: number;
    }
  ): string => {
    const match = params.point.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*),(\d{4})$/);
    if (!match) {
      throw new Error("Invalid point format. Expected format: X,Y,SRID");
    }
    const [x, y, srid] = match.slice(1);
  
    return `
      SELECT
        ${query.columns || "*"} -- Select specified columns or all
      FROM
        ${params.table}
      WHERE
        ST_DWithin(
          ${query.geom_column || "geom"},
          ST_Transform(
            ST_SetSRID(
              ST_MakePoint(${x}, ${y}),
              ${srid}
            ),
            (SELECT ST_SRID(${query.geom_column || "geom"}) FROM ${params.table} LIMIT 1)
          ),
          ${query.distance}
        )
        ${query.filter ? `AND ${query.filter}` : ""} -- Optional filter
      ${query.sort ? `ORDER BY ${query.sort}` : ""} -- Optional sort
      ${query.limit ? `LIMIT ${query.limit}` : ""} -- Optional limit
    `;
  };
  