import fp from "fastify-plugin";
import sql from "mssql";

declare module "fastify" {
  interface FastifyInstance {
    db: sql.ConnectionPool;
  }
}

const sqlConfig = {
  user: "DB_USER",
  password: "DB_PASSWORD",
  database: "DB_NAME",
  server: "DB_SERVER",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true 
  }
}

export default fp(async (fastify) => {

  if (!sqlConfig) {
    fastify.log.error("Sql configuration error");
    throw new Error("Error: Environment variables");
  }

  const pool = new sql.ConnectionPool(sqlConfig);

  try {
    await pool.connect();
    fastify.decorate("db", pool);
    fastify.log.info("Database connected");
  } catch (err) {
    fastify.log.error("Database connection failed", err);
    throw err;
  }
});
