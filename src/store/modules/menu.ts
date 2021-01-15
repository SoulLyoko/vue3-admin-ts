import { ActionContext } from "vuex";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import router from "@/router";
import { getMenu, getPermissions, MenuRouteRecord } from "@/api/sys/menu";
import { generateRoutes } from "@/utils/route";
import { errorRoutes } from "@/router/routes";

const state = {
  asideMenu: [] as MenuRouteRecord[], //左侧菜单
  headerMenu: [] as MenuRouteRecord[], //顶部菜单
  activeMenu: {} as RouteLocationNormalized, //当前激活的菜单
  isCollapse: false, //是否折叠左侧菜单
  perms: [] as string[], //权限数组
  perm: {} as Record<string, boolean> //权限对象
};

export type MenuState = typeof state;

const actions = {
  /** 获取菜单并添加到路由，获取权限数据 */
  async getMenu({ commit, state }: ActionContext<MenuState, any>) {
    const menuRes = await getMenu();
    const routes = generateRoutes(menuRes);
    routes.forEach((route) => {
      router.addRoute(route as RouteRecordRaw);
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
};

const mutations = {
  SET_ASIDE_MENU(state: MenuState, payload: MenuState["asideMenu"]) {
    state.asideMenu = payload || state.headerMenu[0]?.children || [];
  },
  SET_HEADER_MENU(state: MenuState, payload: []) {
    state.headerMenu = payload;
  },
  CHANGE_COLLAPSE(state: MenuState) {
    state.isCollapse = !state.isCollapse;
  },
  SET_PERMS(state: MenuState, payload: string[]) {
    state.perms = payload;
    state.perm = {};
    payload.forEach((item) => {
      state.perm[item] = true;
    });
  },
  SET_ACTIVE_MENU(state: MenuState, payload: MenuState["activeMenu"]) {
    state.activeMenu = payload;
  }
};

const menu = {
  state,
  actions,
  mutations
};

export default menu;
