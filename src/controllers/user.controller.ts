import Koa from "koa";
import Router from "koa-router";
import HttpStatus from "http-status-codes";
import * as userServices from "../services/user.services";
import * as resultUtil from "../utils/result.util";
import * as jwtUtil from "../utils/jwt.util";

const routerOpts: Router.IRouterOptions = {
  prefix: "/users"
};

const router: Router = new Router(routerOpts);
/**
 * 获取全部
 */
router.get("/", async (ctx: Koa.Context) => {
  const users = await userServices.findAll();
  ctx.body = resultUtil.success(users);
});
/**
 * 获取用户本身信息
 */
router.get("/info", async (ctx: Koa.Context) => {
  const payload = jwtUtil.getPayload(ctx.headers.authorization);
  const user = await userServices.findById(payload.id.toString());
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = resultUtil.success(user);
});
/**
 * 获取单个
 */
router.get("/:user_id", async (ctx: Koa.Context) => {
  const user = await userServices.findById(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = resultUtil.success(user);
});
/**
 * 创建
 */
router.post("/", async (ctx: Koa.Context) => {
  const user = await userServices.create(ctx.request.body);
  ctx.body = resultUtil.success(user);
});
/**
 * 删除
 */
router.delete("/:user_id", async (ctx: Koa.Context) => {
  const user = await userServices.findById(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  await userServices.del(ctx.params.user_id);
  ctx.status = HttpStatus.NO_CONTENT;
});
/**
 * 修改部分信息
 */
router.patch("/:user_id", async (ctx: Koa.Context) => {
  const user = await userServices.findById(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  const updatedUser = await userServices.updateSome(
    ctx.params.user_id,
    ctx.request.body
  );
  ctx.body = resultUtil.success(updatedUser);
});

export default router;
