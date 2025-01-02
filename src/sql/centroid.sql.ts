// centroid SQL Query Construction
export const centroidSql = (
  params: { table: string },
  query: {
    geom_column: string;
    srid: number;
    filter?: string;
    force_on_surface?: boolean;
  }
) => {
  const tableName = `${params.table}`;
  const geomColumn = `${query.geom_column}` || "geom";
  // const srid = query.srid || 4326;
  const centroidFunction = query.force_on_surface
    ? "STPointOnSurface"
    : "STCentroid";

  return `
    SELECT
      ${geomColumn}.STSRID() AS srid,
      ${geomColumn}.${centroidFunction}().STX AS x,
      ${geomColumn}.${centroidFunction}().STY AS y
    FROM
      ${tableName}
    ${query.filter ? `WHERE ${query.filter}` : ""}
  `;
};
