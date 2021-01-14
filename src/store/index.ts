import { computed } from "vue";
import { createStore, Store } from "vuex";
import app, { AppState } from "./modules/app";
import menu, { MenuState } from "./modules/menu";
import tabs, { TabsState } from "./modules/tabs";
import user, { UserState } from "./modules/user";

export interface GlobalState {
  app: AppState;
  menu: MenuState;
  tabs: TabsState;
  user: UserState;
}

const store: Store<GlobalState> = createStore({
  modules: { app, menu, tabs, user }
});

export const appState = computed(() => store.state.app).value;
export const menuState = computed(() => store.state.menu).value;
export const tabsState = computed(() => store.state.tabs).value;
export const userState = computed(() => store.state.user).value;

export default store;
