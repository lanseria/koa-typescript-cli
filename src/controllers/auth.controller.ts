import Koa from "koa";
import Router from "koa-router";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "../config/config";
import * as resultUtil from "../utils/result.util";
import * as validator from "../middlewares/validator.middlewares";
import * as userServices from "../services/user.services";

const routerOpts: Router.IRouterOptions = {
  prefix: "/auth"
};

const router: Router = new Router(routerOpts);

function getToken(payload = {}) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "4h" });
}

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});

router.post(
  "/register",
  validator.body(userSchema),
  async (ctx: Koa.Context) => {
    const user = await userServices.create(ctx.request.body);
    ctx.body = resultUtil.success(
      getToken({
        id: user.id,
        name: user.name,
        password: user.password
      })
    );
  }
);

router.post("/login", validator.body(userSchema), async (ctx: Koa.Context) => {
  const user = await userServices.findByUsername(ctx.request.body.name);
  if (user.password === ctx.request.body.password) {
    ctx.body = resultUtil.success(
      getToken({
        id: user.id,
        name: user.name,
        password: user.password
      })
    );
  } else {
    ctx.body = resultUtil.error({
      payload: ctx.request.body,
      dataBase: user
    }, "用户不存在或密码错误")
  }
});

export default router;
