import { storage } from "@/utils/cache";
import screenfull from "screenfull";
import { ActionContext } from "../types";

const state = {
  themeName: (storage.get("themeName") || "default") as string, //主题名称
  isFullscreen: false //是否全屏
};

export type AppState = typeof state;

const actions = {
  /** 切换全屏 */
  toggleFullscreen({ commit }: ActionContext<AppState>) {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
        commit("SET_FULLSCREEN", false);
      } else {
        screenfull.request();
        commit("SET_FULLSCREEN", true);
      }
    }
  }
};

const mutations = {
  SET_THEME_NAME(state: AppState, payload: string) {
    state.themeName = payload;
    document.body.className = "theme-" + payload;
    storage.set("themeName", payload);
  },
  SET_FULLSCREEN(state: AppState, payload: boolean) {
    state.isFullscreen = payload;
  }
};

const app = {
  state,
  actions,
  mutations,
  getters: {}
};

export default app;
