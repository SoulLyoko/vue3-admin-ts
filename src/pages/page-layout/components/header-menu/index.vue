<template>
  <div class="header-menu">
    <el-menu mode="horizontal" :default-active="activeHeader" :style="{ width: menuWidth }">
      <menu-item :menu="menu" v-for="menu in headerMenu" :key="menu.meta._id"></menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "@/store";
import menuItem from "../menu-item/index.vue";

export default defineComponent({
  name: "header-menu",
  components: { menuItem },
  setup() {
    const headerMenu = computed(() => store.state.menu.headerMenu);
    const activeHeader = computed(() => store.state.menu.activeMenu.matched[0]?.name);
    const menuWidth = computed(() => {
      const padding = 20 * 2;
      const icon = 16;
      const margin = 5;
      const fontSize = 14;
      const otherTotal = padding + icon + margin;
      return headerMenu.value.reduce((prev, curr) => prev + curr.meta.title.length * fontSize + otherTotal, 0) + "px";
    });

    return {
      headerMenu,
      activeHeader,
      menuWidth
    };
  }
});
</script>
