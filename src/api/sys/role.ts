import { PageModel } from "../model/page";
import request from "@/utils/axios";

export interface RoleModel {
  _id?: string;
  name?: string;
  code?: string;
  remark?: string;
  menuIds?: string[];
}

// 获取列表
export function getList(params: RoleModel & PageModel): Promise<RoleModel[]> {
  return request.get("/role", { params });
}

// 获取单条信息
export function getInfo(id: string) {
  return request.get("/role/" + id);
}

// 新增
export function create(data: RoleModel) {
  return request.post("/role", data);
}

// 修改
export function update(id: string, data: RoleModel) {
  return request.put("/role/" + id, data);
}

// 删除
export function remove(id: string) {
  return request.delete("/role/" + id);
}
