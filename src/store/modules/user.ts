import { userLogin } from "@/api/sys/account";
import { cookie, storage } from "@/utils/cache";
import { Module } from "vuex";
import { GlobalState } from "..";

export interface UserState {
  userInfo: any;
}

const user: Module<UserState, GlobalState> = {
  state() {
    return {
      userInfo: storage.get("userInfo") || {} //用户信息
    };
  },
  actions: {
    /** 用户登录 */
    async login({ commit }, data) {
      const res = await userLogin(data);
      cookie.set("token", res.token);
      commit("SET_USER_INFO", res.userInfo);
    },
    /** 用户注销 */
    logout() {
      cookie.remove("token");
      storage.clear();
      location.reload();
    }
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
      storage.set("userInfo", data);
    }
  }
};
export default user;
