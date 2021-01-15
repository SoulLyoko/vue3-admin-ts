<template>
  <div class="main-tabs">
    <el-tabs
      :modelValue="activeTab.name"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      @contextmenu="handleContextmenu"
    >
      <el-tab-pane
        v-for="tab in openTabs"
        :key="tab.name"
        :label="tab.meta.title"
        :name="tab.name"
        :closable="tab.name !== 'index'"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <el-button class="main-tabs-menu" icon="el-icon-arrow-down"></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeLeftTabs"><i class="el-icon-back"></i>关闭左侧</el-dropdown-item>
          <el-dropdown-item command="closeRightTabs"><i class="el-icon-right"></i>关闭右侧</el-dropdown-item>
          <el-dropdown-item command="closeOtherTabs"><i class="el-icon-close"></i>关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAllTabs"><i class="el-icon-error"></i>关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ul class="tabs-contextmenu el-dropdown-menu el-popper" :style="contextmenuStyle" v-show="contextmenuVisible">
      <li class="el-dropdown-menu__item" @click="handleCommand('closeLeftTabs', targetPath)">
        <i class="el-icon-back"></i>关闭左侧
      </li>
      <li class="el-dropdown-menu__item" @click="handleCommand('closeRightTabs', targetPath)">
        <i class="el-icon-right"></i>关闭右侧
      </li>
      <li class="el-dropdown-menu__item" @click="handleCommand('closeOtherTabs', targetPath)">
        <i class="el-icon-close"></i>关闭其他
      </li>
      <li class="el-dropdown-menu__item" @click="handleCommand('closeAllTabs', '')">
        <i class="el-icon-error"></i>关闭全部
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import store, { tabsState } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { ElTabPane } from "element-plus";
import { DispatchKeys } from "@/store/types";

export default defineComponent({
  name: "main-tabs",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const contextmenuVisible = ref(false);
    const contextmenuStyle = ref({});
    const targetPath = ref("");
    const openTabs = computed(() => tabsState.openTabs);
    const activeTab = computed(() => tabsState.activeTab);

    function tabClick(tab: typeof ElTabPane) {
      const findRoute = openTabs.value.find((item) => item.name === tab.props.name) || "";
      if (route.name === tab.props.name) return;
      router.push(findRoute);
    }
    function tabRemove(name: string) {
      store.dispatch("closeTab", name);
    }
    function handleCommand(command: DispatchKeys, targetPath?: string) {
      store.dispatch(command, targetPath);
    }
    function mousedownListener(event: MouseEvent) {
      if (event.button === 2) {
        contextmenuVisible.value = false;
      } else {
        setTimeout(() => {
          contextmenuVisible.value = false;
        }, 100);
      }
      window.removeEventListener("mousedown", mousedownListener);
    }
    function handleContextmenu(event: MouseEvent & { target: HTMLDivElement }) {
      event.preventDefault();
      event.stopPropagation();
      contextmenuStyle.value = {
        top: event.clientY + "px",
        left: event.clientX + "px"
      };
      targetPath.value = event.target.id.replace("tab-", "");
      contextmenuVisible.value = true;
      window.addEventListener("mousedown", mousedownListener);
    }

    return {
      contextmenuVisible,
      contextmenuStyle,
      targetPath,
      openTabs,
      activeTab,
      tabClick,
      tabRemove,
      handleCommand,
      handleContextmenu
    };
  }
});
</script>

<style lang="scss" scoped>
.main-tabs {
  .tabs-contextmenu {
    position: absolute;
  }
}
</style>
