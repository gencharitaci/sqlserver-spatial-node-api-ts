// spatial-join.sql.ts
export const spatialJoinSql = (
    params: { table_from: string; table_to: string },
    query: { geom_column_from: string; geom_column_to: string; columns?: string; distance?: number; filter?: string }
  ): string => {
    const tableFrom = `${params.table_from}`;
    const tableTo = `${params.table_to}`;
    const geomColumnFrom = `${query.geom_column_from}`;
    const geomColumnTo = `${query.geom_column_to}`;
    const distance = query.distance || 0;
  
    return `
      SELECT
        ${query.columns || `${tableFrom}.*, ${tableTo}.*`}
      FROM
        ${tableFrom}
      JOIN
        ${tableTo}
      ON
        ${tableFrom}.${geomColumnFrom}.STDistance(${tableTo}.${geomColumnTo}) <= ${distance}
        ${query.filter ? `AND ${query.filter}` : ""}
    `;
  };
  