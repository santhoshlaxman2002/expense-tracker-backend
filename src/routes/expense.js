import ExpenseController from "../controllers/expense.controller.js";
import express from "express";
import Auth from "../middleware/auth.middleware.js";
class Expense {
  static router;
  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.use(Auth.authenticate);
    this.router.get("/", ExpenseController.getExpenses);
    this.router.get("/:id", ExpenseController.getExpense);
    this.router.post("/", ExpenseController.createExpense);
    this.router.put("/:id", ExpenseController.updateExpense);
    this.router.delete("/:id", ExpenseController.deleteExpense);
  }
}

const { router: expense } = new Expense();
export default expense;
