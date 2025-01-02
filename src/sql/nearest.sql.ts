// nearest.sql.ts
// MSSQL için en yakın kayıt sorgusu
export const nearestSql = (
    params: { table: string; point: string },
    query: { geom_column: string; columns: string; filter?: string; limit?: number }
  ): string => {
    const [x, y, srid] = params.point.split(',');
  
    return `
      WITH nearest AS (
        SELECT
          ${query.columns || '*'},
          ${query.geom_column}.STDistance(
            geography::STGeomFromText('POINT(${x} ${y})', ${srid})
          ) AS distance
        FROM
          ${params.table}
        ${query.filter ? `WHERE ${query.filter}` : ""}
      )
      SELECT TOP ${query.limit || 10} *
      FROM nearest
      ORDER BY distance ASC;
    `;
  };
  