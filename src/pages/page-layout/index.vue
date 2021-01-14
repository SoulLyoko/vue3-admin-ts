<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" :class="{ 'is-collapse': isCollapse }">
      <aside-logo></aside-logo>
      <aside-menu></aside-menu>
    </el-aside>
    <el-container class="layout-header-main">
      <el-header class="layout-header">
        <i
          class="header-folder"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="changeCollapse"
        ></i>
        <header-menu></header-menu>
        <div class="header-right">
          <header-search></header-search>
          <header-theme></header-theme>
          <header-fullsceen></header-fullsceen>
          <header-user></header-user>
        </div>
      </el-header>
      <el-main class="layout-main">
        <main-tabs></main-tabs>
        <div class="main-view">
          <router-view></router-view>
          <!-- <router-view>
            <keep-alive :include="keepAliveList"></keep-alive>
          </router-view> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import store, { menuState } from "@/store";
import asideLogo from "./components/aside-logo/index.vue";
import asideMenu from "./components/aside-menu/index.vue";
import headerMenu from "./components/header-menu/index.vue";
import headerSearch from "./components/header-search/index.vue";
import headerTheme from "./components/header-theme/index.vue";
import headerFullsceen from "./components/header-fullscreen/index.vue";
import headerUser from "./components/header-user/index.vue";
import mainTabs from "./components/main-tabs/index.vue";

export default defineComponent({
  name: "page-layout",
  components: {
    asideLogo,
    asideMenu,
    headerMenu,
    headerSearch,
    headerTheme,
    headerFullsceen,
    headerUser,
    mainTabs
  },
  setup() {
    const isCollapse = computed(() => menuState.isCollapse);
    const keepAliveList = computed(() => store.getters.keepAliveList);
    const changeCollapse = () => store.commit("CHANGE_COLLAPSE");
    return {
      isCollapse,
      keepAliveList,
      changeCollapse
    };
  }
});
</script>

<style lang="scss">
// @import "@/assets/style/theme/base.scss";
</style>
