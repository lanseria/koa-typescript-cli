import Koa from "koa";
import Router from "koa-router";
import * as resultUtil from "../utils/result.util";

const router: Router = new Router();

router.get("/", async (ctx: Koa.Context) => {
  ctx.body = resultUtil.success("hello world koa-typescript-cli");
});

export default router;
