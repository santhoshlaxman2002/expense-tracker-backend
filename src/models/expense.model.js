import Model from "./model.js";

export default class ExpenseModel {
  static async getExpenses(user_id) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "SELECT * FROM expenses where deleted_at is null and user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getExpenseById(id) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "SELECT * FROM expenses WHERE id = $1 and deleted_at is null",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async createExpense(
    name,
    amount,
    category_id,
    user_id,
    description = ""
  ) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query(
        "INSERT INTO expenses (name, amount, category_id, user_id,description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, amount, category_id, user_id, description]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateExpense(id, name, amount, category_id, description) {
    try {
      const pool = await Model.getConnection();
      const result = await pool.query(
        "UPDATE expenses SET name = $1, amount = $2, category_id = $3, description = $4, updated_at = current_timestamp WHERE id = $5 RETURNING *",
        [name, amount, category_id, description, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteExpense(id) {
    try {
      const pool = Model.getConnection();
      const result = await pool.query(
        "UPDATE expenses SET deleted_at = current_timestamp WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
