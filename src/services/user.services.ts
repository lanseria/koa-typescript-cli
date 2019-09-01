import { getRepository, Repository } from "typeorm";
import userEntity from "../entity/user.entity";

/**
 * 查询所有
 */
export async function findAll(): Promise<userEntity[]> {
  // Get the user repository from TypeORM.
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  // Find the requested user.
  const users = await userRepo.find();
  return users;
}
/**
 * 通过ID查询
 * @param user_id
 */
export async function findById(user_id: string): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = await userRepo.findOne(user_id);
  return user;
}
/**
 * 创建
 * @param userBody
 */
export async function create(userBody: userEntity): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  let user: userEntity = userRepo.create(userBody);
  user = await userRepo.save(user);
  return user;
}
/**
 * 通过ID删除
 * @param user_id
 */
export async function del(user_id: string): Promise<void> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  await userRepo.delete(user_id);
}
/**
 * 部分更新
 * @param user_id
 * @param userBody
 */
export async function updateSome(
  user_id: string,
  userBody: userEntity
): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = await findById(user_id);
  const updatedMovie = await userRepo.merge(user, userBody);
  return updatedMovie;
}
