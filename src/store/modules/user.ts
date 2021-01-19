import { ActionContext } from "../types";
import { LoginModel, userLogin } from "@/api/sys/account";
import { UserModel } from "@/api/sys/user";
import { cookie, storage } from "@/utils/cache";

const state = {
  userInfo: (storage.get("userInfo") || {}) as UserModel //用户信息
};

export type UserState = typeof state;

const actions = {
  /** 用户登录 */
  async login({ commit }: ActionContext<UserState>, payload: LoginModel) {
    const res = await userLogin(payload);
    cookie.set("token", res.token);
    commit("SET_USER_INFO", res.userInfo);
  },
  /** 用户注销 */
  logout() {
    cookie.remove("token");
    storage.clear();
    location.reload();
  }
};

const mutations = {
  SET_USER_INFO(state: UserState, payload: UserState["userInfo"]) {
    state.userInfo = payload;
    storage.set("userInfo", payload);
  }
};

const user = {
  state,
  actions,
  mutations,
  getters: {}
};

export default user;
