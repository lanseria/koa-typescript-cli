import request from "supertest";
import { eApp } from "../src/server";
import Result from "../src/vo/result.vo";
import config from "../src/config/config";
// https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest
// https://molunerfinn.com/Use-Jest-To-Test-Vue-Koa/#Koa%E5%90%8E%E7%AB%AFApi%E6%B5%8B%E8%AF%95
test("Hello koa-typescript-cli", async () => {
  const app = await eApp;
  const response: request.Response = await request(app.callback())
    .get("/")
    .set("Authorization", "Bearer " + config.token);
  expect(response.status).toBe(200);
  const result: Result<string> = JSON.parse(response.text);
  expect(result.data).toBe("hello world koa-typescript-cli");

  expect(response.text).toMatchSnapshot();
});
