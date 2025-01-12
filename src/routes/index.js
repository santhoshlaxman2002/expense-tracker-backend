import express from "express";
import user from "./user.js";

class Router {
  static router;

  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.use("/user", user);
  }
}

const { router } = new Router();
export default router;
