import { RouteRecordRaw } from "vue-router";
import request from "@/utils/axios";

export interface MenuModel {
  _id?: string;
  parentId?: string;
  name?: string;
  type?: "0" | "1";
  icon?: string;
  permissions?: string;
  sort?: number;
  cache?: false;
  title?: string;
  path?: string;
  component?: string;
  createTime?: string;
  blank?: boolean;
  updateBy?: string;
  updateTime?: string;
  url?: string;
  query?: string;
  children?: MenuModel[];
}

export type MenuRouteRecord = Omit<RouteRecordRaw, "meta" | "children"> & {
  meta: MenuModel;
  children: MenuRouteRecord[];
};

// 获取导航菜单
export function getMenu(): Promise<MenuModel[]> {
  return request.get("/menu/get/nav");
}

// 获取权限
export function getPermissions(): Promise<string[]> {
  return request.get("/menu/get/permissions");
}

// 获取菜单管理列表树
export function getTree(params: MenuModel): Promise<MenuModel[]> {
  return request.get("/menu/get/tree", { params });
}

export function getInfo(id: string): Promise<MenuModel> {
  return request.get("/menu/" + id);
}

export function create(data: MenuModel) {
  return request.post("/menu", data);
}

export function update(id: string, data: MenuModel) {
  return request.put("/menu/" + id, data);
}

export function remove(id: string) {
  return request.delete("/menu/" + id);
}
