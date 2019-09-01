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

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});

router.post(
  "/register",
  validator.body(registerUserSchema),
  async (ctx: Koa.Context) => {
    const user = await userServices.create(ctx.request.body);
    ctx.body = resultUtil.success(
      getToken({
        name: user.name,
        password: user.password
      })
    );
  }
);

router.post("/login", async (ctx: Koa.Context) => {
  ctx.body = resultUtil.success("hello world koa-typescript-cli");
});

export default router;
