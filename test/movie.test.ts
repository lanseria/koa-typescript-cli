import request from "supertest";
import { eApp } from "../src/server";
import Result from "../src/vo/result.vo";
import Mock from "mockjs";
import Movie from "../src/entity/movie.entity";

const movieUrlPrefix = "/movies";

function createRandomObj(): Movie {
  return {
    id: undefined,
    name: Mock.mock("@name"),
    releaseYear: +Mock.mock('@date("yyyy")'),
    rating: Mock.mock("@integer(60, 100)")
  };
}

function removeIdObj(obj: Movie) {
  const originObj = { ...obj };
  delete originObj.id;
  return JSON.stringify(originObj);
}

test(`[POST] ${movieUrlPrefix} add a random movie`, async () => {
  const app = await eApp;
  // 新增一个对象
  const randomObj = createRandomObj();
  const response: request.Response = await request(app.callback())
    .post(`${movieUrlPrefix}`)
    .send(randomObj);
  const result: Result<Movie> = JSON.parse(response.text);
  const movieResult = { ...result.data };
  const testMovieResult = removeIdObj(movieResult);
  // 验证其为200与值一致
  expect(response.status).toBe(200);
  expect(testMovieResult).toBe(JSON.stringify(randomObj));
  // 新增完之后移除
  await request(app.callback()).delete(`${movieUrlPrefix}/${movieResult.id}`);
});

test(`[GET] ${movieUrlPrefix} getAll`, async () => {
  const app = await eApp;
  // 新增一个对象
  const randomObj = createRandomObj();
  await request(app.callback())
    .post(`${movieUrlPrefix}`)
    .send(randomObj);
  // 查看所有
  const response: request.Response = await request(app.callback()).get(
    `${movieUrlPrefix}`
  );
  const result: Result<Movie[]> = JSON.parse(response.text);
  const movieResult = [...result.data];
  const oneMovieResult = movieResult[movieResult.length - 1];
  const testMovieResult = removeIdObj(oneMovieResult);
  // 验证其为200与值一致
  expect(response.status).toBe(200);
  expect(testMovieResult).toBe(JSON.stringify(randomObj));
  // 新增完之后移除
  await request(app.callback()).delete(
    `${movieUrlPrefix}/${oneMovieResult.id}`
  );
});

test(`[GET] ${movieUrlPrefix} getById`, async () => {
  const app = await eApp;
  // 新增一个对象
  const randomObj = createRandomObj();
  let response: request.Response = await request(app.callback())
    .post(`${movieUrlPrefix}`)
    .send(randomObj);
  let result: Result<Movie> = JSON.parse(response.text);
  // 通过ID查询
  response = await request(app.callback()).get(
    `${movieUrlPrefix}/${result.data.id}`
  );
  result = JSON.parse(response.text);
  const movieResult = { ...result.data };
  const testMovieResult = removeIdObj(movieResult);
  // 验证其为200与值一致
  expect(response.status).toBe(200);
  expect(testMovieResult).toBe(JSON.stringify(randomObj));
  // 新增完之后移除
  await request(app.callback()).delete(`${movieUrlPrefix}/${movieResult.id}`);
});

test(`[PATCH] ${movieUrlPrefix} updateSome`, async () => {
  const app = await eApp;
  // 新增一个对象
  let randomObj = createRandomObj();
  let response: request.Response = await request(app.callback())
    .post(`${movieUrlPrefix}`)
    .send(randomObj);
  let result: Result<Movie> = JSON.parse(response.text);
  // 准备 update some 数据
  randomObj = createRandomObj();
  // 通过 ID 修改部分数据
  response = await request(app.callback())
    .patch(`${movieUrlPrefix}/${result.data.id}`)
    .send(randomObj);
  result = JSON.parse(response.text);
  const movieResult = { ...result.data };
  const testMovieResult = removeIdObj(movieResult);
  // 验证其为200与值一致
  expect(response.status).toBe(200);
  expect(testMovieResult).toBe(JSON.stringify(randomObj));
  // 新增完之后移除
  await request(app.callback()).delete(`${movieUrlPrefix}/${movieResult.id}`);
});
