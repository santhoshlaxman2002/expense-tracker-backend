import JWT from "../utils/jwt.js"
import Response from "../utils/response.js";

export default class Auth{
    static async authenticate(req, res, next) {
      try {
        const token = req.headers.authorization;
        if (!token) {
          return Response.sendUnauthorized(res, "Token is required");
        }
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user_id;
        return next();
      } catch (error) {
        console.log(error);
        return Response.sendUnauthorized(res, "Invalid token");
      }
    }
}