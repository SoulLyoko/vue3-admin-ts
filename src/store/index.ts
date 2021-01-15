import { computed } from "vue";
import { createStore, ModuleTree } from "vuex";
import { Store, RootState } from "./types";

const files = require.context("./modules", false, /\.ts$/);
const modules: ModuleTree<RootState> = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

const store: Store = createStore<RootState>({ modules });

export const appState = computed(() => store.state.app).value;
export const menuState = computed(() => store.state.menu).value;
export const tabsState = computed(() => store.state.tabs).value;
export const userState = computed(() => store.state.user).value;

export default store;
