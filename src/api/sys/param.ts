import { PageModel } from "../model/page";
import request from "@/utils/axios";

export interface ParamModel {
  _id?: string;
  name?: string;
  value?: string;
  remark?: string;
}

// 获取列表
export function getList(params: ParamModel & PageModel): Promise<ParamModel[]> {
  return request.get("/param", { params });
}

// 获取单条信息
export function getInfo(id: string): Promise<ParamModel> {
  return request.get("/param/" + id);
}

// 新增
export function create(data: ParamModel) {
  return request.post("/param", data);
}

// 修改
export function update(id: string, data: ParamModel) {
  return request.put("/param/" + id, data);
}

// 删除
export function remove(id: string) {
  return request.delete("/param/" + id);
}
