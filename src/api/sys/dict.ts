import request from "@/utils/axios";

export interface DictModel {
  _id?: string;
  parentId?: string;
  label?: string;
  type?: string;
  value?: string;
  remark?: string;
  sort?: number;
  children?: DictModel[];
}

// 获取字典树
export function getTree(params: DictModel): Promise<DictModel[]> {
  return request.get("/dict/get/tree", { params });
}

// 获取字典type
export function getDictType(type: string): Promise<DictModel[]> {
  return request.get("/dict/type/" + type);
}

export function getInfo(id: string) {
  return request("/dict/" + id);
}

export function create(data: DictModel) {
  return request.post("/dict", data);
}

export function update(id: string, data: DictModel) {
  return request.put("/dict/" + id, data);
}

export function remove(id: string) {
  return request.delete("/dict/" + id);
}
