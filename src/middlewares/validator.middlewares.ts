import Joi from "joi";
import { Middleware } from "koa";
import HttpStatus from "http-status-codes";
import * as resultUtil from "../utils/result.util";

export function body(schema: Joi.Schema): Middleware {
  return function (ctx, next) {
    const { error, value } = Joi.validate(ctx.request.body, schema);
    if (error) {
      ctx.status = HttpStatus.BAD_REQUEST;
      ctx.body = resultUtil.error(error, "字段验证失败");
    } else {
      ctx.request.body = value;
      return next();
    }
  };
}
