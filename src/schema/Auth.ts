import jwt from "jsonwebtoken";
import * as config from "../config/config";

export default (request: any) => {
  const header = request.req.headers.authorization;

  // not found
  if (!header) return { isAuth: false };

  // token
  const token: any = header.split(" ");

  // token not found
  if (!token) return { isAuth: false };

  let decodeToken: any;

  try {
    decodeToken = jwt.verify(token[1], config.default.jwtSecret);
  } catch (err) {
    return { isAuth: false };
  }

  // in case any error found
  if (!!!decodeToken) return { isAuth: false };

  // token decoded successfully, and extracted data
  return { isAuth: true, userId: decodeToken.userId };
};