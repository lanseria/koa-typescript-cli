import Result from "../vo/result.vo";
/**
 * 成功构造方法
 * @param msg 信息
 * @param data 传递数据
 */
export function success(data: any, msg: string = 'success'): Result<any> {
  const result = new Result(0, msg, data)
  return result
}
/**
 * 失败构造方法
 * @param msg 信息
 * @param data 传递数据
 */
export function error(data: any, msg: string = 'error'): Result<any> {
  const result = new Result(1, msg, data)
  return result
}
