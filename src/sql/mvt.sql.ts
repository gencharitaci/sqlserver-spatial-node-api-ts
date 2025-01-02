// mvt.sql.ts
// MSSQL için MVT SQL sorgusu oluşturma
export const mvtSql = (
    params: { table: string; z: number; x: number; y: number },
    query: { geom_column: string; columns?: string; id_column?: string; filter?: string }
  ): string => {
    // ZXY tile envelope hesaplama
    const tileSize = 40075016.68557849 / Math.pow(2, params.z);
    const xMin = params.x * tileSize - 20037508.342789244;
    const xMax = (params.x + 1) * tileSize - 20037508.342789244;
    const yMin = 20037508.342789244 - (params.y + 1) * tileSize;
    const yMax = 20037508.342789244 - params.y * tileSize;
  
    return `
      WITH mvtgeom AS (
        SELECT
          ${query.geom_column}.STAsBinary() AS geom
          ${query.columns ? `, ${query.columns}` : ""}
          ${query.id_column ? `, ${query.id_column}` : ""}
        FROM
          ${params.table}
        WHERE
          ${query.geom_column}.STIntersects(
            geometry::STGeomFromText(
              'POLYGON((${xMin} ${yMin}, ${xMax} ${yMin}, ${xMax} ${yMax}, ${xMin} ${yMax}, ${xMin} ${yMin}))',
              3857
            )
          ) = 1
          ${query.filter ? `AND ${query.filter}` : ""}
      )
      SELECT
        geom AS geometry,
        ${query.id_column ? `${query.id_column} AS id` : ""}
        ${query.columns ? `, ${query.columns}` : ""}
      FROM
        mvtgeom;
    `;
  };
  