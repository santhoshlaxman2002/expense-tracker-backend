import ExpenseModel from "../models/expense.model.js";
import Response from "../utils/response.js";

export default class ExpenseController {
  static async getExpenses(req, res) {
    try {
      const result = await ExpenseModel.getExpenses(req.user);
      if (!result) {
        return Response.sendNotFound(res, "Expenses not found");
      }
      return Response.sendSuccess(res, result, "Expenses fetched");
    } catch (error) {
      return Response.sendInternalServerError(res);
    }
  }

  static async getExpense(req, res) {
    try {
      const { id } = req.params;
      const result = await ExpenseModel.getExpenseById(id);
      if (!result) {
        return Response.sendNotFound(res, "Expense not found");
      }
      return Response.sendSuccess(res, result, "Expense fetched");
    } catch (error) {
      return Response.sendInternalServerError(res);
    }
  }

  static async createExpense(req, res) {
    try {
      const { name, amount, category_id, description } = req.body;
      const result = await ExpenseModel.createExpense(
        name,
        amount,
        category_id,
        req.user,
        description
      );
      return Response.sendCreated(res, result, "Expense Created");
    } catch (error) {
      return Response.sendInternalServerError(res);
    }
  }

  static async updateExpense(req, res) {
    try {
      const { id } = req.params;
      const { name, amount, category_id, description } = req.body;
      const result = await ExpenseModel.updateExpense(
        id,
        name,
        amount,
        category_id,
        description
      );
      return Response.sendSuccess(res, result, "Expense updated");
    } catch (error) {
      return Response.sendInternalServerError(res);
    }
  }

  static async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      await ExpenseModel.deleteExpense(id);
      return Response.sendSuccess(res, {}, "Expense deleted");
    } catch (error) {
      return Response.sendInternalServerError(res);
    }
  }
}
