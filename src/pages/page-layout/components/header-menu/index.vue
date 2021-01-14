<template>
  <div class="header-menu">
    <el-menu mode="horizontal" :default-active="activeHeader" :style="{ width: menuWidth }">
      <menu-item :menu="menu" v-for="menu in headerMenu" :key="menu.meta._id"></menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { menuState } from "@/store";
import menuItem from "../menu-item/index.vue";

export default defineComponent({
  name: "header-menu",
  components: { menuItem },
  setup() {
    const headerMenu = computed(() => menuState.headerMenu);
    const activeMenu = computed(() => menuState.activeMenu);
    const activeHeader = computed(() => menuState.activeMenu.matched[0]?.name);
    const menuWidth = "auto";

    return {
      headerMenu,
      activeMenu,
      activeHeader,
      menuWidth
    };
  }
});
</script>
