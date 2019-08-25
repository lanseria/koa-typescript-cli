import { getRepository, Repository } from "typeorm";
import movieEntity from "../entity/movie.entity";

/**
 * 查询所有
 */
export async function findAll(): Promise<movieEntity[]> {
  // Get the movie repository from TypeORM.
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
  // Find the requested movie.
  const movies = await movieRepo.find();
  return movies;
}
/**
 * 通过ID查询
 * @param movie_id
 */
export async function findById(movie_id: string): Promise<movieEntity> {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
  const movie = await movieRepo.findOne(movie_id);
  return movie;
}
/**
 * 创建
 * @param movieBody
 */
export async function create(movieBody: movieEntity): Promise<movieEntity> {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
  let movie: movieEntity = movieRepo.create(movieBody);
  movie = await movieRepo.save(movie);
  return movie;
}
/**
 * 通过ID删除
 * @param movie_id
 */
export async function del(movie_id: string): Promise<void> {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
  await movieRepo.delete(movie_id);
}
/**
 * 部分更新
 * @param movie_id
 * @param movieBody
 */
export async function updateSome(
  movie_id: string,
  movieBody: movieEntity
): Promise<movieEntity> {
  const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
  const movie = await findById(movie_id);
  const updatedMovie = await movieRepo.merge(movie, movieBody);
  return updatedMovie;
}
