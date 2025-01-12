import express from "express";
import CategoryController from "../controllers/category.controller.js";

class Category {
  static router;

  constructor() {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.get("/", CategoryController.getCategories);
    this.router.get("/:id", CategoryController.getCateogryById);
    this.router.post("/", CategoryController.createCategory);
    this.router.put("/:id", CategoryController.updateCategory);
    this.router.delete("/:id", CategoryController.deleteCategory);
  }
}

const { router: category } = new Category();
export default category;
