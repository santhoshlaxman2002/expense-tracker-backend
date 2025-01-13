import express from "express";
import user from "./user.js";
import category from "./category.js";
import expense from "./expense.js";

class Router {
  static router;

  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.use("/user", user);
    this.router.use("/category", category);
    this.router.use("/expense", expense);
  }
}

const { router } = new Router();
export default router;
