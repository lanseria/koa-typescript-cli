import Koa from "koa";
import HttpStatus from "http-status-codes";
import bodyParser from "koa-bodyparser";
import koaJwt from "koa-jwt";
import config from "../config/config";
import * as resultUtil from "../utils/result.util";
import indexController from "../controllers/index.controller";
import movieController from "../controllers/movie.controller";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";
import roleController from "../controllers/role.controller";

const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = resultUtil.error(ctx, error.message);
  }
});

// Middleware
app.use(bodyParser());

app.use(
  koaJwt({ secret: config.jwtSecret }).unless({
    path: [/^\/auth\/login/, /^\/auth\/register/]
  })
);

// Route middleware.
app.use(indexController.routes()).use(indexController.allowedMethods());

app.use(movieController.routes()).use(movieController.allowedMethods());

app.use(userController.routes()).use(userController.allowedMethods());

app.use(authController.routes()).use(authController.allowedMethods());

app.use(roleController.routes()).use(roleController.allowedMethods());

// Application error logging.
if (process.env.NODE_ENV !== "test") {
  app.on("error", console.error);
}

export default app;
