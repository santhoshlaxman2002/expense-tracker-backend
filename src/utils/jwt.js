import jwt from "jsonwebtoken";

export default class JWT {
  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  static async verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
