import app from "./app/app";

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// import * as Koa from "koa";
// import * as Router from "koa-router";
// import * as logger from "koa-logger";
// import * as json from "koa-json";
// import * as bodyParser from "koa-bodyparser";

// const app = new Koa();
// const router = new Router();

// interface HelloRequest {
//   name: String;
// }

// router.post("/", async (ctx, next) => {
//   const data = <HelloRequest>ctx.request.body;
//   ctx.body = { name: data.name };
//   await next();
// });

// app.use(json());
// app.use(logger());
// app.use(bodyParser());

// app.use(router.routes()).use(router.allowedMethods());

// app.listen(3000, () => {
//   console.log("Server running on port http://localhost:3000");
// });
