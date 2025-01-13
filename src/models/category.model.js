import Model from "./model.js";

export default class CategoryModel {
  static async getCategories(userId) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "SELECT * FROM categories where user_id = $1 and deleted_at is null",
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "SELECT * FROM categories WHERE id = $1 and deleted_at is null",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createCategory(name, userId) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query(
        "INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *",
        [name, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateCategory(id, name) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "UPDATE categories SET name = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *",
        [name, id]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query(
        "UPDATE categories SET deleted_at = current_timestamp WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
