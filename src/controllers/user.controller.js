import UserModel from "../models/user.model.js";
import JWT from "../utils/jwt.js";
import Password from "../utils/password.js";
import Response from "../utils/response.js";

export default class User {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserModel.login(email);
      if (!result) {
        return Response.sendUnauthorized(res, "User not found");
      }
      const isMatch = await Password.compare(password, result.password);
      if (!isMatch) {
        return Response.sendUnauthorized(res, "Invalid credentials");
      }
      const token = await JWT.sign({ "user_id":result.id });
      return Response.sendSuccess(res, { token }, "Login success");
    } catch (err) {
      console.log(err);
      return Response.sendInternalServerError(res);
    }
  }

  static async register(req, res) {
    try {
      let { name, email, password } = req.body;
      password = await Password.hash(password);
      const result = await UserModel.register(name, email, password);
      return Response.sendCreated(res, result, "User created");
    } catch (err) {
      console.log(err);
      return Response.sendInternalServerError(res);
    }
  }
}
