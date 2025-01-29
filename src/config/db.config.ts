import fp from "fastify-plugin";
import sql from "mssql";

declare module "fastify" {
  interface FastifyInstance {
    db: sql.ConnectionPool;
  }
}

export default fp(async (fastify) => {
  const connectionString = process.env.MSSQL_CONNECTION;

  if (!connectionString) {
    fastify.log.error("MSSQL_CONNECTION is not defined in the .env file");
    throw new Error("Missing MSSQL_CONNECTION environment variable");
  }

  const pool = new sql.ConnectionPool(connectionString);

  try {
    await pool.connect();
    fastify.decorate("db", pool);
    fastify.log.info("Database connected");
  } catch (err) {
    fastify.log.error("Database connection failed", err);
    throw err;
  }
});
