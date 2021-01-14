<template>
  <el-submenu :index="menu.name">
    <template #title>
      <i class="menu-icon" :class="menu.meta.icon"></i>
      <span class="menu-title">{{ menu.meta.title }}</span>
    </template>
    <template v-for="item in menu.children">
      <menu-sub :menu="item" :key="item.name" v-if="item.children && item.children.length"></menu-sub>
      <menu-item :menu="item" :key="item.name" v-else></menu-item>
    </template>
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuRouteRecord } from "@/api/sys/menu";
import MenuItem from "../menu-item/index.vue";

export default defineComponent({
  name: "menu-sub",
  components: { MenuItem },
  props: {
    menu: {
      type: Object as PropType<MenuRouteRecord>,
      default: () => ({})
    }
  }
});
</script>

<style lang="" scoped></style>
