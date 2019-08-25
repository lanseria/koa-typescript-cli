import request from "supertest";
import { eApp } from "../src/server";
import Result from "../src/vo/result.vo";
import Mock from "mockjs";

const movieUrlPrefix = "/movies";

test(`[POST] ${movieUrlPrefix} add a random movie`, async () => {
  const app = await eApp;
  const randomObj = {
    name: Mock.mock("@name"),
    releaseYear: Mock.mock('@date("yyyy")'),
    rating: Mock.mock("@integer(60, 100)")
  };
  const response: request.Response = await request(app.callback())
    .post(`${movieUrlPrefix}`)
    .send(randomObj);
  expect(response.status).toBe(200);
  const result: Result<typeof randomObj> = JSON.parse(response.text);
  expect(result.data.name).toBe(randomObj.name);
  expect(result.data.releaseYear).toBe(randomObj.releaseYear);
  expect(result.data.rating).toBe(randomObj.rating);
});
