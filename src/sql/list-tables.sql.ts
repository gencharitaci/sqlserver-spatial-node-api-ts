export const listTablesSql = (
    query: { filter?: string }
  ): string => {
    return `
      SELECT
        TABLE_NAME AS table_name,
        TABLE_TYPE AS table_type
      FROM
        INFORMATION_SCHEMA.TABLES
      WHERE
        TABLE_SCHEMA NOT IN ('sys', 'INFORMATION_SCHEMA')
        ${query.filter ? `AND TABLE_NAME LIKE '%${query.filter}%'` : ""}
      ORDER BY TABLE_NAME;
    `;
  };
  