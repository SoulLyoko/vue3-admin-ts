<template>
  <div class="aside-menu">
    <el-menu :collapse="isCollapse" :default-active="activeMenu.name" unique-opened>
      <template v-for="menu in asideMenu">
        <menu-sub :menu="menu" :key="menu.meta._id" v-if="menu.children && menu.children.length"></menu-sub>
        <menu-item :menu="menu" :key="menu.meta._id" v-else></menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { menuState } from "@/store";
import menuSub from "../menu-sub/index.vue";
import menuItem from "../menu-item/index.vue";

export default defineComponent({
  name: "aside-menu",
  components: { menuSub, menuItem },
  setup() {
    const isCollapse = computed(() => menuState.isCollapse);
    const asideMenu = computed(() => menuState.asideMenu);
    const activeMenu = computed(() => menuState.activeMenu);

    return { isCollapse, asideMenu, activeMenu };
  }
});
</script>

<style lang="" scoped></style>
