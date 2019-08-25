import request from "supertest";
import { eApp } from "../src/server";
import Result from "../src/vo/result.vo";

test("Hello koa-typescript-cli", async () => {
  const app = await eApp;
  const response: request.Response = await request(app.callback()).get("/");
  expect(response.status).toBe(200);
  const result: Result<string> = JSON.parse(response.text);
  expect(result.data).toBe("hello world koa-typescript-cli");

  expect(response.text).toMatchSnapshot();
});
