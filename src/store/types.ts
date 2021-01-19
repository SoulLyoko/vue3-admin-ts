import { Store as S, ActionContext as AC, CommitOptions, DispatchOptions } from "vuex";
/*start*/
import app from "./modules/app";
import menu from "./modules/menu";
import tabs from "./modules/tabs";
import user from "./modules/user";

export type RootState = {
  app: typeof app.state;
  menu: typeof menu.state;
  tabs: typeof tabs.state;
  user: typeof user.state;
};
export type Mutations = typeof app.mutations & typeof menu.mutations & typeof tabs.mutations & typeof user.mutations;
export type Actions = typeof app.actions & typeof menu.actions & typeof tabs.actions & typeof user.actions;
export type Getters = typeof app.getters & typeof menu.getters & typeof tabs.getters & typeof user.getters;
/*end*/

// 将 mutations 函数名及 payload 类型转换成 commit 函数的两个入参类型
export interface Commit {
  <T extends keyof Mutations>(type: T, payload?: Parameters<Mutations[T]>[1], options?: CommitOptions): void;
}

// 将 actions 函数名及 payload 类型转换成 dispatch 函数的两个入参类型
export interface Dispatch {
  <T extends keyof Actions>(type: T, payload?: Parameters<Actions[T]>[1], options?: DispatchOptions): Promise<any>;
}

export interface Store extends S<RootState> {
  state: RootState;
  commit: Commit;
  dispatch: Dispatch;
  getters: Getters;
}

export interface ActionContext<S> extends AC<S, RootState> {
  dispatch: Store["dispatch"]; // 全局的 dispatch, 有 ts 提示支持
  commit: Store["commit"]; // 全局的 commit, 有 ts 提示支持
  state: S;
  getters: Getters;
  rootState: Store["state"]; // 全局的 state, 有 ts 提示支持
  rootGetters: any; // 暂时还无法实现将全局 getter 定义过来，会出现类型循环引用问题
}
