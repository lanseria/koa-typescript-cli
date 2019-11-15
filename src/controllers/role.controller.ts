import Koa from "koa";
import Router from "koa-router";
import HttpStatus from "http-status-codes";
import * as roleServices from "../services/role.services";
import * as resultUtil from "../utils/result.util";
import * as jwtUtil from "../utils/jwt.util";

const routerOpts: Router.IRouterOptions = {
  prefix: "/roles"
};

const router: Router = new Router(routerOpts);
/**
 * 获取全部
 */
router.get("/", async (ctx: Koa.Context) => {
  const roles = await roleServices.findAll();
  ctx.body = resultUtil.success(roles);
});
/**
 * 获取单个
 */
router.get("/:role_id", async (ctx: Koa.Context) => {
  const role = await roleServices.findById(ctx.params.role_id);
  if (!role) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = resultUtil.success(role);
});
/**
 * 创建
 */
router.post("/", async (ctx: Koa.Context) => {
  const role = await roleServices.create(ctx.request.body);
  ctx.body = resultUtil.success(role);
});
/**
 * 删除
 */
router.delete("/:role_id", async (ctx: Koa.Context) => {
  const role = await roleServices.findById(ctx.params.role_id);
  if (!role) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  const result = await roleServices.del(ctx.params.role_id);
  ctx.body = resultUtil.success(result);
});
/**
 * 修改部分信息
 */
router.patch("/:role_id", async (ctx: Koa.Context) => {
  const role = await roleServices.findById(ctx.params.role_id);
  if (!role) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  const updatedRole = await roleServices.updateSome(
    ctx.params.role_id,
    ctx.request.body
  );
  ctx.body = resultUtil.success(updatedRole);
});

export default router;
