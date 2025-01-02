// SQL Query for Geometry Reprojection
export const reprojectSql = (
    params: { table: string },
    query: { geom_column: string; target_srid: number; filter?: string }
  ): string => {
    return `
      SELECT
        ${query.geom_column}.STAsText() AS original_geometry,
        ${query.geom_column}.STSrid AS original_srid,
        ${query.geom_column}.STTransform(${query.target_srid}).STAsText() AS reprojected_geometry,
        ${query.target_srid} AS target_srid
      FROM
        ${params.table}
      ${query.filter ? `WHERE ${query.filter}` : ""}
    `;
  };
  