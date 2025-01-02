// buffer-analysis.sql.ts
export const bufferAnalysisSql = (
    params: { table: string },
    query: { geom_column: string; buffer_distance: number; columns?: string; filter?: string }
  ): string => {
    const tableName = `${params.table}`;
    const geomColumn = `${query.geom_column}`;
    const bufferDistance = query.buffer_distance;
  
    return `
      WITH BufferGeometry AS (
        SELECT
          ${geomColumn}.STBuffer(${bufferDistance}) AS buffer_geom
        FROM
          ${tableName}
        ${query.filter ? `WHERE ${query.filter}` : ""}
      )
      SELECT
        ${query.columns || "*"},
        ${geomColumn}.STAsText() AS geometry,
        BufferGeometry.buffer_geom.STAsText() AS buffer_geometry
      FROM
        ${tableName},
        BufferGeometry
      WHERE
        ${geomColumn}.STIntersects(BufferGeometry.buffer_geom) = 1
    `;
  };
  