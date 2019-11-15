import { getRepository, Repository, DeleteResult } from "typeorm";
import roleEntity from "../entity/role.entity";
/**
 * 查询所有
 */
export async function findAll (): Promise<roleEntity[]> {
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
export async function findById (roleId: string): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  const role = (await roleRepo.findOne(roleId)) || new roleEntity();
  return role;
}
/**
 * 创建
 * @param roleBody
 */
export async function create (roleBody: roleEntity): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  let role: roleEntity = roleRepo.create(roleBody);
  role = await roleRepo.save(role);
  return role;
}
/**
 * 通过ID删除
 * @param roleId
 */
export async function del (roleId: string): Promise<DeleteResult> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  const result: DeleteResult = await roleRepo.delete(roleId);
  return result
}
/**
 * 部分更新
 * @param roleId
 * @param roleBody
 */
export async function updateSome (
  roleId: string,
  roleBody: roleEntity
): Promise<roleEntity> {
  const roleRepo: Repository<roleEntity> = getRepository(roleEntity);
  const role = await findById(roleId);
  const updatedRole = await roleRepo.merge(role, roleBody);
  await roleRepo.save(updatedRole)
  return updatedRole;
}
