import Koa from "koa";
import HttpStatus from "http-status-codes";
import bodyParser from "koa-bodyparser";
import indexController from "../controllers/index.controller";
import movieController from "../controllers/movie.controller";
import userController from "../controllers/user.controller";

const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

// Middleware
app.use(bodyParser());

// Route middleware.
app.use(indexController.routes()).use(indexController.allowedMethods());

app.use(movieController.routes()).use(movieController.allowedMethods());

app.use(userController.routes()).use(userController.allowedMethods());

// Application error logging.
if (process.env.NODE_ENV !== "test") {
  app.on("error", console.error);
}

export default app;
