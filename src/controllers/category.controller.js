import CategoryModel from "../models/category.model.js";
import Response from "../utils/response.js";

export default class Category {
  static async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getCategories(req.user);
      if (!categories || categories.length === 0) {
        return Response.sendNotFound(res, "No categories found");
      }
      return Response.sendSuccess(res, categories, "Categories fetched");
    } catch (error) {
      console.log(error);
      return Response.sendInternalServerError(res);
    }
  }

  static async getCateogryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.getCategoryById(id);
      if (!category) {
        return Response.sendNotFound(res, "No categories found");
      }
      return Response.sendSuccess(res, category, "Category fetched");
    } catch (error) {
      console.log(error);
      return Response.sendInternalServerError(res);
    }
  }

  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await CategoryModel.createCategory(name, req.user);
      return Response.sendCreated(res, category, "Category created");
    } catch (error) {
      console.log(error);
      return Response.sendInternalServerError(res);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await CategoryModel.updateCategory(id, name);
      return Response.sendSuccess(res, category, "Category updated");
    } catch (error) {
      console.log(error);
      return Response.sendInternalServerError(res);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await CategoryModel.deleteCategory(id);
      return Response.sendSuccess(res, {}, "Category deleted");
    } catch (error) {
      console.log(error);
      return Response.sendInternalServerError(res);
    }
  }
}
