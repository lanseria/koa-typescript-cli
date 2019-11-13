import { getRepository, Repository } from "typeorm";
import roleEntity from "../entity/role.entity";
/**
 * 查询所有
 */
export async function findAll(): Promise<roleEntity[]> {
  // Get the role repository from TypeORM.
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  // Find the requested role.
  const roles = await roleRepo.find();
  return roles;
}
/**
 * 通过ID查询
 * @param roleId
 */
export async function findById(roleId: string): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  const role = (await roleRepo.findOne(roleId)) || new roleEntity();
  return role;
}
/**
 * 创建
 * @param roleBody
 */
export async function create(roleBody: roleEntity): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  let role: roleEntity = roleRepo.create(roleBody);
  role = await roleRepo.save(role);
  return role;
}
/**
 * 通过ID删除
 * @param roleId
 */
export async function del(roleId: string): Promise<void> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  await roleRepo.delete(roleId);
}
/**
 * 部分更新
 * @param roleId
 * @param roleBody
 */
export async function updateSome(
  roleId: string,
  roleBody: roleEntity
): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  const role = await findById(roleId);
  const updatedRole = await roleRepo.merge(role, roleBody);
  return updatedRole;
}
