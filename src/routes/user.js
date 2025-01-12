import express from "express";
import UserController from "../controllers/user.controller.js";
class User {
  static router;

  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.post("/login",UserController.login);
    this.router.post("/register",UserController.register);
  }
}

const { router: user } = new User();
export default user;
