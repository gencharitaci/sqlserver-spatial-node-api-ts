export const geojsonSql = (
    params: { table: string },
    query: {
      geom_column: string;
      columns?: string;
      id_column?: string;
      filter?: string;
      bounds?: string;
      precision?: number;
    }
  ) => {
    const bounds = query.bounds ? query.bounds.split(",").map(Number) : null;
    const tableName = `[${params.table}]`; // Safely enclose table name
    const geomColumn = `[${query.geom_column}]`; // Safely enclose column name
    const columns = query.columns
      ? query.columns
          .split(",")
          .map((col) => `[${col.trim()}]`)
          .join(", ")
      : null;
    const idColumn = query.id_column ? `[${query.id_column}]` : null;
  
    // Start building the query
    const sqlQuery = `
      SELECT (
        SELECT
          'Feature' AS [type],
          CASE 
            -- Handle Point geometry
            WHEN ${geomColumn}.STGeometryType() = 'Point' THEN
              JSON_QUERY('{"type": "Point", "coordinates": ' +
                '[' + REPLACE(REPLACE(REPLACE(REPLACE(${geomColumn}.ToString(),'POINT ',''),'(','['),')',']'),' ',',') + ']}')
  
            -- Handle Polygon geometry
            WHEN ${geomColumn}.STGeometryType() = 'Polygon' THEN
              JSON_QUERY('{"type": "Polygon", "coordinates": ' +
                '[' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${geomColumn}.ToString(),'POLYGON ',''),'(','['),')',']'),'], ',']],['),', ','],['),' ',',') + ']}')
  
            -- Handle MultiPolygon geometry
            WHEN ${geomColumn}.STGeometryType() = 'MultiPolygon' THEN
              JSON_QUERY('{"type": "MultiPolygon", "coordinates": ' +
                '[' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${geomColumn}.ToString(),'MULTIPOLYGON ',''),'(','['),')',']'),'], ',']],['),', ','],['),' ',',') + ']}' )
  
            -- Handle MultiPoint geometry
            WHEN ${geomColumn}.STGeometryType() = 'MultiPoint' THEN
              JSON_QUERY('{"type": "MultiPoint", "coordinates": ' +
                '[' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${geomColumn}.ToString(),'MULTIPOINT ',''),'(','['),')',']'),'], ',']],['),', ','],['),' ',',') + ']}' )
  
            -- Handle LineString geometry
            WHEN ${geomColumn}.STGeometryType() = 'LineString' THEN
              JSON_QUERY('{"type": "LineString", "coordinates": ' +
                '[' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${geomColumn}.ToString(),'LINESTRING ',''),'(','['),')',']'),'], ',']],['),', ','],['),' ',',') + ']}' )
            
            ELSE NULL
          END AS [geometry],
          
          -- Add properties
          JSON_QUERY((
            SELECT
              ${idColumn || 'NULL'} AS [id],
              ${columns || 'NULL'} AS [properties]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
          )) AS [properties]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS geojson
      FROM ${tableName}
      ${
        query.filter || bounds
          ? 'WHERE ' +
            (query.filter ? `${query.filter}` : '') +
            (query.filter && bounds ? ' AND ' : '') +
            (bounds && bounds.length === 4
              ? `${geomColumn}.STIntersects(
                  geometry::STGeomFromText(
                    'POLYGON ((${bounds[0]} ${bounds[1]}, ${bounds[2]} ${bounds[1]}, ${bounds[2]} ${bounds[3]}, ${bounds[0]} ${bounds[3]}, ${bounds[0]} ${bounds[1]}))', 4326
                  )
                ) = 1`
              : '')
          : ''
      }
    `;
    return sqlQuery.trim();
  };
  