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
 * @param userId
 */
export async function findById(userId: string): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = (await userRepo.findOne(userId)) || new userEntity();
  return user;
}
/**
 * 通过usename查询
 * @param username
 */
export async function findByUsername(username: string): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user =
    (await userRepo.findOne({
      where: {
        username: username
      }
    })) || new userEntity();
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
 * @param userId
 */
export async function del(userId: string): Promise<void> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  await userRepo.delete(userId);
}
/**
 * 部分更新
 * @param userId
 * @param userBody
 */
export async function updateSome(
  userId: string,
  userBody: userEntity
): Promise<userEntity> {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const user = await findById(userId);
  const updatedUser = await userRepo.merge(user, userBody);
  return updatedUser;
}
