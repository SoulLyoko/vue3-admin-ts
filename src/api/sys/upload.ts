import { PageModel } from "../model/page";
import request from "@/utils/axios";

export interface UploadModel {
  _id?: string;
  filename?: string;
  extname?: string;
  mime?: string;
  size?: string;
  url?: string;
  target?: string;
}

// 获取列表
export function getList(params: UploadModel & PageModel): Promise<UploadModel[]> {
  return request.get("/upload", { params });
}

// 获取单条信息
export function getInfo(id: string) {
  return request.get("/upload/" + id);
}

// 新增
export function uploadFile(data: UploadModel) {
  return request.post("/upload", data);
}

// 新增
export function uploadFiles(data: UploadModel) {
  return request.post("/uploads", data);
}

// 修改
export function update(id: string, data: UploadModel) {
  return request.put("/upload/" + id, data);
}

// 删除
export function remove(id: string) {
  return request.delete("/upload/" + id);
}
