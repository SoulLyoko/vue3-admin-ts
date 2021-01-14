<template>
  <el-menu-item :index="menu.name" @click="menuClick(menu)">
    <i class="menu-icon" :class="menu.meta.icon"></i>
    <span class="menu-title">{{ menu.meta.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuRouteRecord } from "@/api/sys/menu";
import { menuClick } from "@/utils/route";

export default defineComponent({
  name: "menu-item",
  props: {
    menu: {
      type: Object as PropType<MenuRouteRecord>,
      default: () => ({})
    }
  },
  setup() {
    return {
      menuClick
    };
  }
});
</script>

<style lang="" scoped></style>
