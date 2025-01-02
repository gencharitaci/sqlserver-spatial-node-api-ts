// query SQL Query Construction
export const querySql = (
  params: { table: string },
  query: {
    columns: string;
    filter?: string;
    group?: string;
    sort?: string;
    limit?: number;
  }
) => {
  const tableName = `[dbo].[${params.table}]`;
  const columns = query.columns || "*";
  const filter = query.filter ? `WHERE ${query.filter}` : "";
  const group = query.group ? `GROUP BY ${query.group}` : "";
  const sort = query.sort ? `ORDER BY ${query.sort}` : "";
  const limit = query.limit ? `TOP ${query.limit}` : ""; // SQL Server uses TOP for limiting rows

  return `
      SELECT
        ${limit} ${columns}
      FROM
        ${tableName}
      ${filter}
      ${group}
      ${sort}
    `;
};
