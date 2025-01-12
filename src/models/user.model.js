import Model from "./model.js";

export default class UserModel {
  static async login(email) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async register(name, email, password) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) Returning id, name, email",
        [name, email, password]
      );
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
