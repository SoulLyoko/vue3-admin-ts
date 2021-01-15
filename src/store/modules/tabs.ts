import { ActionContext } from "vuex";
import { RouteLocationNormalized } from "vue-router";
import router from "@/router";
import { indexPage, frameOut } from "@/router/routes";
import { storage } from "@/utils/cache";

const state = {
  activeTab: {} as RouteLocationNormalized, //当前激活的标签页
  openTabs: (storage.get("openTabs") || []) as RouteLocationNormalized[] //已打开的标签页
};

export type TabsState = typeof state;

const getters = {
  keepAliveList: (state: TabsState) => state.openTabs.filter((item) => item.meta.cache).map((item) => item.name)
};

const actions = {
  /**
   * 打开标签页
   * @param {Object} to 路由信息
   */
  openTab({ commit, state, rootState }: ActionContext<TabsState, any>, to: RouteLocationNormalized) {
    const hasTab = state.openTabs.some((item) => item.path === to.path);
    const isFrameOut = frameOut.some((item) => item.path === to.path);
    const currentHeader = rootState.menu.headerMenu.find((menu: any) => menu.path === to.matched[0].path);
    if (!hasTab && !isFrameOut) {
      commit("SET_TABS", [...state.openTabs, { ...to, matched: undefined }]);
    }
    commit("SET_ACTIVE_TAB", to);
    commit("SET_ACTIVE_MENU", to, { root: true });
    commit("SET_ASIDE_MENU", currentHeader?.children, { root: true });
  },
  /**
   * 关闭单个标签
   * @param {String} tabName tab绑定的value
   */
  closeTab({ commit, state }: ActionContext<TabsState, any>, tabName: string) {
    if (tabName === state.activeTab.name) {
      const prevIndex = (state.openTabs.findIndex((tab) => tab.name === tabName) || 1) - 1;
      router.push(state.openTabs[prevIndex]);
    }
    const filterTabs = state.openTabs.filter((tab) => tab.name !== tabName);
    commit("SET_TABS", filterTabs);
  },
  /** 关闭所有标签 */
  closeAllTabs({ commit }: ActionContext<TabsState, any>) {
    commit("SET_TABS", []);
    router.push("/index");
  },
  /**
   * 关闭其他标签
   * @param {String} path 传值则切换到该标签
   */
  closeOtherTabs({ commit, state }: ActionContext<TabsState, any>, path: string) {
    path = path || state.activeTab.path;
    router.push(path);
    const filterTabs = state.openTabs.filter((item) => item.path === path);
    commit("SET_TABS", filterTabs);
  },
  /**
   * 关闭左侧标签
   * @param {String} path 传值则切换到该标签
   */
  closeLeftTabs({ commit, state }: ActionContext<TabsState, any>, path: string) {
    path = path || state.activeTab.path;
    router.push(path);
    const findIndex = state.openTabs.findIndex((item) => item.path === path);
    const filterTabs = state.openTabs.filter((item, index) => index >= findIndex);
    commit("SET_TABS", filterTabs);
  },
  /**
   * 关闭右侧标签
   * @param {String} path 传值则切换到该标签
   */
  closeRightTabs({ commit, state }: ActionContext<TabsState, any>, path: string) {
    path = path || state.activeTab.path;
    router.push(path);
    const findIndex = state.openTabs.findIndex((item) => item.path === path);
    const filterTabs = state.openTabs.filter((item, index) => index <= findIndex);
    commit("SET_TABS", filterTabs);
  }
};

const mutations = {
  SET_TABS(state: TabsState, payload: RouteLocationNormalized[]) {
    if (payload.some((item: RouteLocationNormalized) => item.name === indexPage.name)) {
      state.openTabs = payload;
    } else {
      state.openTabs = [(indexPage as unknown) as RouteLocationNormalized, ...payload];
    }
    storage.set("openTabs", state.openTabs);
  },
  SET_ACTIVE_TAB(state: TabsState, payload: TabsState["activeTab"]) {
    state.activeTab = payload;
  }
};

const tabs = {
  state,
  getters,
  actions,
  mutations
};

export default tabs;
