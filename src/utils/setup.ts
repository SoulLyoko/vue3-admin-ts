import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/style/public.scss";
import { App } from "vue";
import store from "@/store";
import router from "@/router";
import dayjs from "dayjs";
import * as util from "./index";
import { storage, cookie } from "./cache";
import components from "@/components";

export const setupApp = (app: App<Element>) => {
  app.use(ElementPlus);
  app.use(store);
  app.use(router);

  Object.keys(components).forEach((key) => {
    const component = components[key];
    app.component(component.name || "", component);
  });

  app.config.globalProperties.$util = util;
  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$cookie = cookie;
  app.config.globalProperties.$dayjs = dayjs;
};
