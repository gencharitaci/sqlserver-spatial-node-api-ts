// SQL Query for SRID Validation
export const sridValidationSql = (params: { srid: number }): string => {
    return `
      SELECT
        srid,
        auth_name,
        auth_srid,
        srtext,
        proj4text
      FROM
        sys.spatial_reference_systems
      WHERE
        srid = ${params.srid}
    `;
  };
  