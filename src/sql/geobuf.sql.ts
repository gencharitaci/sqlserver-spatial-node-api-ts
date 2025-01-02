export const geobufSql = (params: { table: string }, query: { geom_column: string; columns?: string; filter?: string; bounds?: string }) => {
    const bounds = query.bounds ? query.bounds.split(",").map(Number) : null;
    const tableName = `[dbo].[${params.table}]`;
    const geomColumn = `[${query.geom_column}]`;
    const columns = query.columns ? query.columns.split(",").map(col => `[${col.trim()}]`).join(", ") : null;
  
    return `
      SELECT
        ${geomColumn}.STAsBinary() AS geom -- Return geometry as WKB (alternative to Geobuf)
        ${columns ? `, ${columns}` : ""}
      FROM
        ${tableName}
      ${query.filter || bounds ? "WHERE" : ""}
      ${query.filter ? `${query.filter}` : ""}
      ${query.filter && bounds ? "AND" : ""}
      ${bounds && bounds.length === 4
        ? `
          ${geomColumn}.Filter(
            geometry::STGeomFromText(
              'POLYGON ((${bounds[0]} ${bounds[1]}, ${bounds[0]} ${bounds[3]}, ${bounds[2]} ${bounds[3]}, ${bounds[2]} ${bounds[1]}, ${bounds[0]} ${bounds[1]}))',
              4326
            )
          ) = 1`
        : ""}
    `;
  };
  