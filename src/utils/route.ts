import { Component } from "vue";
import { MenuModel, MenuRouteRecord } from "@/api/sys/menu";
import store from "@/store";
import router from "@/router";

/**
 * @function 生成vue-router使用的路由格式
 * @param {Array} menuArr 从后端获取的源数据
 * @param {Object} parent  上级
 * @returns {Array} 生成的路由数据
 */
export function generateRoutes(menuArr: MenuModel[], parent: MenuModel = { path: "", title: "" }): MenuRouteRecord[] {
  function getComponent(name: string): () => Promise<Component> {
    switch (name) {
      case "Layout":
        return () => import("@/pages/page-layout/index.vue");
      case "Main":
        return () => import("@/pages/page-main/index.vue");
      case "Iframe":
        return () => import("@/pages/page-iframe/index.vue");
      default:
        return () => import("@/views/" + name + "/index.vue");
    }
  }
  return menuArr.map((menu) => {
    menu.path = (parent.path || "") + menu.path;
    const path = menu.path;
    const component = getComponent(menu.component || "");
    const children = menu.children?.length ? generateRoutes(menu.children, menu) : [];
    return {
      path,
      name: menu.name,
      component,
      children,
      meta: {
        ...menu,
        children: []
      }
    };
  });
}

/**
 * 菜单点击跳转
 * @param menu
 */
export function menuClick(menu: MenuRouteRecord): void {
  if (menu.meta.component === "Layout") {
    store.commit("SET_ASIDE_MENU", menu.children);
  } else if (menu.meta.component === "Iframe" && menu.meta.blank) {
    window.open(menu.meta.url, "_blank");
  } else {
    router.push({
      path: menu.path + menu.meta.query || ""
    });
  }
}
