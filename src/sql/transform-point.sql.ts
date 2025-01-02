export const transformPointSql = (
    params: { point: string },
    query: { srid: number }
  ): string => {
    const match = params.point.match(/^((-?\d+\.?\d+)(,-?\d+\.?\d+)(,[0-9]{4}))/);
  
    if (!match) {
      throw new Error("Invalid point format. Expected format: X,Y,SRID");
    }
  
    const [x, y] = match[0].split(',');
  
    return `
      SELECT
        geography::Point(${y}, ${x}, ${query.srid}).Long AS x,
        geography::Point(${y}, ${x}, ${query.srid}).Lat AS y
    `;
  };
  