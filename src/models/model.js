import pg from "pg";

export default class Model {
  static pool;

  static getConnection() {
    if (!this.pool) {
      this.pool = new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
    }
    return this.pool;
  }

  static closeConnection() {
    if (this.pool) {
      this.pool.end();
    }
  }
}
