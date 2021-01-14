import { getMenu, getPermissions, MenuRouteRecord } from "@/api/sys/menu";
import { generateRoutes } from "@/utils/route";
import router from "@/router";
import { errorRoutes } from "@/router/routes";
import { Module } from "vuex";
import { RouteLocationNormalized } from "vue-router";
import { GlobalState } from "..";

export interface MenuState {
  asideMenu: MenuRouteRecord[];
  headerMenu: MenuRouteRecord[];
  activeMenu: RouteLocationNormalized;
  isCollapse: boolean;
  perms: string[];
  perm: Record<string, boolean>;
}

const menu: Module<MenuState, GlobalState> = {
  state() {
    return {
      asideMenu: [], //左侧菜单
      headerMenu: [], //顶部菜单
      activeMenu: {} as RouteLocationNormalized, //当前激活的菜单
      isCollapse: false, //是否折叠左侧菜单
      perms: [], //权限数组
      perm: {} //权限对象
    };
  },
  actions: {
    /** 获取菜单并添加到路由，获取权限数据 */
    async getMenu({ commit, state }) {
      const menuRes = await getMenu();
      const routes = generateRoutes(menuRes);
      routes.forEach((route) => {
        router.addRoute(route);
      });
      errorRoutes.forEach((errRoute) => {
        router.addRoute(errRoute);
      });
      commit("SET_HEADER_MENU", routes);
      if (!state.asideMenu.length) {
        commit("SET_ASIDE_MENU", routes[0].children);
      }
      const permRes = await getPermissions();
      commit("SET_PERMS", permRes);
    }
  },
  mutations: {
    SET_ASIDE_MENU(state, data) {
      state.asideMenu = data || state.headerMenu[0]?.children || [];
    },
    SET_HEADER_MENU(state, data) {
      state.headerMenu = data;
    },
    CHANGE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_PERMS(state, data: string[]) {
      state.perms = data;
      state.perm = {};
      data.forEach((item) => {
        state.perm[item] = true;
      });
    },
    SET_ACTIVE_MENU(state, data) {
      state.activeMenu = data;
    }
  }
};

export default menu;
