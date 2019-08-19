import * as Koa from "koa";
import * as Router from "koa-router";
import { getRepository, Repository } from "typeorm";
import userEntity from "../entity/user.entity";
import * as HttpStatus from "http-status-codes";

const routerOpts: Router.IRouterOptions = {
  prefix: "/users"
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const users = await userRepo.find();
  ctx.body = {
    data: { users }
  };
});

router.get("/:user_id", async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = await userRepo.findOne(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = {
    data: { user }
  };
});

router.post("/", async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const body: userEntity = ctx.request.body;
  const user: userEntity = userRepo.create(body);
  await userRepo.save(user);
  ctx.body = {
    data: { user }
  };
});

router.delete("/:user_id", async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = await userRepo.findOne(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  await userRepo.delete(user);

  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch("/:user_id", async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user: userEntity = await userRepo.findOne(ctx.params.user_id);
  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  const updatedUser = await userRepo.merge(user, ctx.request.body);
  userRepo.save(updatedUser);
  ctx.body = {
    data: { user: updatedUser }
  };
});

export default router;
