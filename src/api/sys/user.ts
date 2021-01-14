import request from "@/utils/axios";
import { PageModel } from "../model/page";

export interface UserModel {
  _id?: string;
  username?: string;
  password?: string;
  status?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  mobile?: string;
  realName?: string;
  deptId?: string;
  roleIds?: [];
}

// 获取列表
export function getList(params: PageModel & UserModel): Promise<UserModel[]> {
  return request.get("/user", { params });
}

// 获取单条信息
export function getInfo(id: string) {
  return request.get("/user/" + id);
}

// 新增
export function create(data: UserModel) {
  return request.post("/user", data);
}

// 修改
export function update(id: string, data: UserModel) {
  return request.put("/user/" + id, data);
}

// 删除
export function remove(id: string) {
  return request.delete("/user/" + id);
}
