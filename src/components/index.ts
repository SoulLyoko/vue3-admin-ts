/**
 * 全局组件在这里导入并导出，app将在启动时自动注册
 */
import { Component } from "vue";
const files = require.context("./", true, /index\.vue$/);
const components: Record<string, Component> = {};
files.keys().forEach((key) => {
  const component = files(key).default;
  components[key] = component;
});
export default components;
