import Koa from "koa";
import Router from "koa-router";
import Joi from "joi";
import * as resultUtil from "../utils/result.util";
import * as jwtUtil from "../utils/jwt.util";
import * as validator from "../middlewares/validator.middlewares";
import * as userServices from "../services/user.services";

const routerOpts: Router.IRouterOptions = {
  prefix: "/auth"
};

const router: Router = new Router(routerOpts);

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().default(0)
});

router.post(
  "/register",
  validator.body(userSchema),
  async (ctx: Koa.Context) => {
    const user = await userServices.create(ctx.request.body);
    ctx.body = resultUtil.success(
      jwtUtil.getToken({
        id: user.id,
        username: user.username,
        password: user.password
      })
    );
  }
);

router.post("/login", validator.body(userSchema), async (ctx: Koa.Context) => {
  const user = await userServices.findByUsername(ctx.request.body.username);
  if (user.password === ctx.request.body.password) {
    ctx.body = resultUtil.success(
      jwtUtil.getToken({
        id: user.id,
        username: user.username,
        password: user.password
      })
    );
  } else {
    ctx.body = resultUtil.error(
      {
        payload: ctx.request.body,
        dataBase: user
      },
      "用户不存在或密码错误"
    );
  }
});

export default router;
