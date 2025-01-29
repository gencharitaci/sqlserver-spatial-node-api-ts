# SQLServer Spatial Node API

A scalable and robust API for managing spatial data in SQL Server, built with **TypeScript** and **Fastify**. This API is designed to provide efficient handling of geospatial queries and seamless integration with GIS systems.

Tobin's [Dirt-Simple PostGIS HTTP API](https://github.com/tobinbradley/dirt-simple-postgis-http-api) inspired me to develop this.

(It's not mature yet, You are welcome for testing)

## Features

- **Spatial Data Management**: Perform advanced geospatial queries and operations on SQL Server spatial data.
- **Dynamic Routing**: Flexible routes for CRUD operations and geospatial queries.
- **TypeScript Support**: Ensures type-safe development for enhanced reliability.
- **Fastify Framework**: High-performance HTTP server for Node.js applications.
- **Extensible Design**: Built to accommodate future enhancements and integrations with GIS or other spatial systems.



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gencharitaci/sqlserver-spatial-node-api-ts.git
   ```

2. Navigate to the project directory:
    ```bash
    cd sqlserver-spatial-node-api-ts
    ```

3. Install dependencies:
   ```bash 
   npm install
   ```

## Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```


## Production File Structure

```plaintext
.
├── 📂 app/
│   ├── 📄 mssql.js           # Handles MSSQL configuration and connection logic
│   ├── 📄 logger.js          # Centralized logger configuration
│   ├── 📄 envValidator.js    # Validates environment variables
├── 📄 index.ts               # Entry point for the server
├── 📄 .env                   # Environment variables
├── 📄 package.json           # Node.js dependencies
├── 📄 tsconfig.json          # TypeScript configuration
```


## Usage
SQLServer Spatial Node API provides spatial functionalities using SQL Server's spatial features. 
Below is the list of available routes with example usages.

---


# API Route Endpoints (WILL UPDATE SOON)

This document lists all available API route endpoints for the project. Each route is defined with its specific functionality.

## Routes

### Bounding Box
- **Route**: `/bbox/:table`
- **Description**: Retrieves the bounding box for features within a specified table.

### Buffer Analysis
- **Route**: `/buffer-analysis/:table`
- **Description**: Creates a buffer around geometries and returns affected features.

### Centroid
- **Route**: `/centroid/:table`
- **Description**: Calculates the centroid of geometries in a specified table.

### GeoBuf
- **Route**: `/geobuf/:table`
- **Description**: Converts geometries into GeoBuf format.

### GeoJSON
- **Route**: `/geojson/:table`
- **Description**: Outputs geometries in GeoJSON format.

### Intersect Feature
- **Route**: `/intersect-feature/:table_from/:table_to`
- **Description**: Returns features from two tables that intersect.

### Intersect Point
- **Route**: `/intersect-point/:table`
- **Description**: Finds records intersecting with a specific point.

### List Columns
- **Route**: `/list-columns/:table`
- **Description**: Lists all columns in the specified table.

### List Tables
- **Route**: `/list-tables`
- **Description**: Lists all accessible tables and views.

### Mapbox Vector Tile
- **Route**: `/mvt/:table/:z/:x/:y`
- **Description**: Returns map data in Mapbox Vector Tile format.

### Nearest Point
- **Route**: `/nearest/:table/:point`
- **Description**: Finds the records closest to a given point.

### Query
- **Route**: `/query/:table`
- **Description**: Executes a custom query on a specified table.

### Reproject Geometry
- **Route**: `/reproject/:table`
- **Description**: Reprojects entire geometries into a specified SRID.

### Spatial Join
- **Route**: `/spatial-join/:table_from/:table_to`
- **Description**: Performs a spatial join between two tables.

### SRID Validation
- **Route**: `/srid-validation/:srid`
- **Description**: Validates the SRID against the spatial reference catalog.

### Transform Point
- **Route**: `/transform-point/:point`
- **Description**: Transforms a point to a different coordinate system.

### Within Radius
- **Route**: `/within-radius/:table/:point`
- **Description**: Finds records within a specific radius of a point.

---

## **Environment Variables**

| Variable              | Default Value | Description                                      |
|-----------------------|---------------|--------------------------------------------------|
| `MSSQL_CONNECTION`    | -             | MSSQL database connection string.               |
| `BASE_PATH`           | `/`           | Base path for the application.                  |
| `API_PREFIX`          | `/v1`         | API version prefix.                             |
| `CACHE_PRIVACY`       | `private`     | Cache privacy level.                            |
| `CACHE_MAXAGE`        | `3600`        | Cache maximum age in seconds.                   |
| `CACHE_EXPIRESIN`     | `3600`        | Cache expiration time in seconds.               |
| `RATE_MAX`            | `100`         | Maximum allowed requests per minute.            |

---

## **Swagger Documentation**

Access the Swagger UI for detailed documentation and testing:
```
http://localhost:3000/docs
```

---


## Scripts
- Builds the application for production.
  ```bash
  npm run build
  ```
- Starts the production server.
  ```bash
  npm run start
  ```
- Runs the test suite.
  ```bash
  npm run test
  ```
- Lints the codebase using ESLint.
  ```bash
  npm run lint
  ```


## Testing
- Run the test suite using:
  ```bash
  npm test
  ```
- For watch mode:
  ```bash
  npm run test:watch
  ```

## Keywords
sqlserver, spatial-data, gis, geospatial, typescript, fastify, nodejs, api-development, dynamic-routing, token-authentication, spatial-queries, sqlserver-integration, geospatial-api, node-gis.

## License
This project is licensed under the MIT License.


## Contributing
Contributions are welcome! Please follow these steps:
- Fork the repository.
- Create a feature branch.
- Submit a pull request with a detailed explanation of your changes.

## Author
Developed by Adem Kurtipek.


## Contact
Thank you for considering this project! 
If you have any questions or need further assistance, feel free to reach out. 

Happy coding!
