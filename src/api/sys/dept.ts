import { PageModel } from "../model/page";
import { UserModel } from "./user";
import request from "@/utils/axios";

export interface DeptModel {
  _id?: string;
  parentId?: string;
  name?: string;
  sort?: number;
  children?: DeptModel[] | UserModel[];
}

export function getList(params: DeptModel & PageModel): Promise<DeptModel[]> {
  return request.get("/dept", { params });
}

export function getTree(params: DeptModel): Promise<DeptModel[]> {
  return request.get("/dept/get/tree", { params });
}

export function getUserTree(params: DeptModel): Promise<DeptModel[]> {
  return request.get("/dept/get/userTree", { params });
}

export function getInfo(id: string) {
  return request.get("/dept/" + id);
}

export function create(data: DeptModel) {
  return request.post("/dept", data);
}

export function update(id: string, data: DeptModel) {
  return request.put("/dept/" + id, data);
}

export function remove(id: string) {
  return request.delete("/dept/" + id);
}
