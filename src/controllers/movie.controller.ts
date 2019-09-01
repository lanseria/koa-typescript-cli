import Koa from "koa";
import Router from "koa-router";
import HttpStatus from "http-status-codes";
import * as movieServices from "../services/movie.services";
import * as resultUtil from "../utils/result.util";

const routerOpts: Router.IRouterOptions = {
  prefix: "/movies"
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  // Movie Service findAll
  const movies = await movieServices.findAll();
  // Respond with our movie data.
  ctx.body = resultUtil.success(movies);
});

router.get("/:movie_id", async (ctx: Koa.Context) => {
  // Movie Service findById
  const movie = await movieServices.findById(ctx.params.movie_id);
  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  // Respond with our movie data.
  ctx.body = resultUtil.success(movie);
});

router.post("/", async (ctx: Koa.Context) => {
  const movie = await movieServices.create(ctx.request.body);
  // Set the status to 201.
  // Respond with our movie data.ctx.status = HttpStatus.CREATED;
  ctx.body = resultUtil.success(movie);
});

router.delete("/:movie_id", async (ctx: Koa.Context) => {
  const movie = await movieServices.findById(ctx.params.movie_id);
  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  // Delete movie.
  await movieServices.del(ctx.params.movie_id);
  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch("/:movie_id", async (ctx: Koa.Context) => {
  const movie = await movieServices.findById(ctx.params.movie_id);
  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  const updatedMovie = await movieServices.updateSome(
    ctx.params.movie_id,
    ctx.request.body
  );
  ctx.body = resultUtil.success(updatedMovie);
});

export default router;
