import bcrypt from "bcrypt";

export default class Password {
  static async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async compare(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
