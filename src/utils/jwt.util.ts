import jwt from "jsonwebtoken";
import config from "../config/config";

interface JwtUserInfo {
  id: String,
  username: String,
  password: String,
  iat: Number,
  exp: Number,
}

/**
 * 通过 payload 生成 token
 * @param payload 
 */
export function getToken(payload = {}) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "10h" });
}
/**
 * 通过 token 获取 JWT 的 payload
 * @param token 
 */
export function getPayload(token: String): JwtUserInfo {
  // 验证并解析 JWT
  const originTwtUserInfo: any = jwt.verify(token.split(' ')[1], config.jwtSecret);
  const jwtUserInfo: JwtUserInfo = {
    id: originTwtUserInfo.id,
    username: originTwtUserInfo.username,
    password: originTwtUserInfo.password,
    iat: originTwtUserInfo.iat,
    exp: originTwtUserInfo.exp,
  }
  return jwtUserInfo
}
