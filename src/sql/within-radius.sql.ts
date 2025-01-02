// within-radius.sql.ts
export const withinRadiusSql = (
    params: { table: string; point: string },
    query: { geom_column: string; radius: number; columns?: string; filter?: string; limit?: number }
  ): string => {
    const match = params.point.match(/^(-?\d+\.?\d+),(-?\d+\.?\d+),(\d+)$/);
  
    // Validate and parse the point
    if (!match) {
      throw new Error("Invalid point format. Expected format: X,Y,SRID");
    }
  
    const [x, y, srid] = match;
  
    return `
      SELECT
        ${query.columns || "*"},
        ${query.geom_column}.STDistance(
          geography::Point(${y}, ${x}, ${srid})
        ) AS distance
      FROM
        ${params.table}
      WHERE
        ${query.geom_column}.STDistance(
          geography::Point(${y}, ${x}, ${srid})
        ) <= ${query.radius}
        ${query.filter ? `AND ${query.filter}` : ""}
      ORDER BY
        distance
      ${query.limit ? `OFFSET 0 ROWS FETCH NEXT ${query.limit} ROWS ONLY` : ""}
    `;
  };
  