import { createStore, ModuleTree } from "vuex";
import { Store, RootState } from "./types";

const files = require.context("./modules", false, /\.ts$/);
const modules: ModuleTree<RootState> = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

const store: Store = createStore<RootState>({ modules });

export default store;
