// SQL Query for Intersect Feature Route

export const intersectFeatureSql = (
    params: { table_from: string; table_to: string },
    query: {
      geom_column_from: string;
      geom_column_to: string;
      columns: string;
      filter?: string;
      distance?: number;
      sort?: string;
      limit?: number;
    }
  ): string => {
    return `
      SELECT
        ${query.columns || '*'} -- Select specified columns or all
      FROM
        ${params.table_from}, ${params.table_to}
      WHERE
        ST_DWithin(
          ${params.table_from}.${query.geom_column_from || 'geom'},
          ${params.table_to}.${query.geom_column_to || 'geom'},
          ${query.distance || 0}
        )
        ${query.filter ? `AND ${query.filter}` : ''} -- Optional filter
      ${query.sort ? `ORDER BY ${query.sort}` : ''} -- Optional sort
      ${query.limit ? `LIMIT ${query.limit}` : ''} -- Optional limit
    `;
  };
  