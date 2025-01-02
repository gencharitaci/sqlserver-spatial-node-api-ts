// bbox (Bounding Box) SQL Query Construction
export const bboxSql = (
  params: { table: string },
  query: { geom_column: string; filter?: string }
) => {
  const tableName = `${params.table}`;
  const geomColumn = `${query.geom_column}`;

  return `
      SELECT
        ${geomColumn}.STEnvelope().ToString() AS bbox
      FROM
        ${tableName}
      ${query.filter ? `WHERE ${query.filter}` : ""}
    `;
};
