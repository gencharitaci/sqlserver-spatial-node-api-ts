export const listColumnsSql = (params: { table: string }): string => {
    return `
      SELECT 
        COLUMN_NAME AS field_name,
        DATA_TYPE AS field_type
      FROM 
        INFORMATION_SCHEMA.COLUMNS
      WHERE 
        TABLE_NAME = '${params.table}';
    `;
  };
  