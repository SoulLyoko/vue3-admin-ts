import { Store as S, ActionContext as AC } from "vuex";
import app from "./modules/app";
import menu from "./modules/menu";
import tabs from "./modules/tabs";
import user from "./modules/user";

export interface RootState {
  app: typeof app.state;
  menu: typeof menu.state;
  tabs: typeof tabs.state;
  user: typeof user.state;
}

// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
export type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
};
// 提取所有 module 的 getter 函数类型对象
type GettersFuncs = typeof tabs.getters;
// 将 getter 转换成对象
export type Getters = ReturnGetters<GettersFuncs>;

// 提取 mutation 函数类型
type CommitFuncs = typeof app.mutations & typeof menu.mutations & typeof tabs.mutations & typeof user.mutations;
export type CommitKeys = keyof CommitFuncs;
// 将 mutation 函数名及 payload 类型转换成 commit 函数的两个入参类型
export interface Commit {
  <T extends CommitKeys>(type: T, payload?: Parameters<CommitFuncs[T]>[1]): void;
}

// dispatch 处理步骤同 commit
type DispatchFuncs = typeof app.actions & typeof menu.actions & typeof tabs.actions & typeof user.actions;
export type DispatchKeys = keyof DispatchFuncs;
export interface Dispatch {
  <T extends DispatchKeys>(type: T, payload?: Parameters<DispatchFuncs[T]>[1]): Promise<any>;
}

export interface Store extends S<RootState> {
  state: RootState;
  commit: Commit;
  dispatch: Dispatch;
}

export interface ActionContext<S> extends AC<S, RootState> {
  dispatch: Store["dispatch"]; // 全局的 dispatch, 有 ts 提示支持
  commit: Store["commit"]; // 全局的 commit, 有 ts 提示支持
  state: S;
  getters: Getters;
  rootState: Store["state"]; // 全局的 state, 有 ts 提示支持
  rootGetters: any; // 暂时还无法实现将全局 getter 定义过来，会出现类型循环引用问题
}
