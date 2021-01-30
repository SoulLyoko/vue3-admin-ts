<template>
  <div class="header-search">
    <el-tooltip effect="dark" content="搜索" placement="bottom" v-if="!inputVisible">
      <i class="el-icon-search" @click="showInput"></i>
    </el-tooltip>
    <el-autocomplete
      ref="inputRef"
      size="small"
      v-model="searchKey"
      :fetch-suggestions="querySearch"
      placeholder="输入菜单名称搜索"
      @select="handleSelect"
      @blur="handleBlur"
      v-else
      style="width: 150px"
    >
      <template #suffix>
        <i class="el-icon-close el-input__icon" @click="closeInput()"></i>
      </template>
      <template #default="{ item }">
        <div>
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </div>
        <div style="color: #aaa">{{ item.path }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import { MenuRouteRecord } from "@/api/sys/menu";
import { flatTree } from "@/utils/tree";
import { menuClick } from "@/utils/route";
import store from "@/store";

export default defineComponent({
  name: "header-search",
  setup() {
    const inputVisible = ref(false);
    const searchKey = ref("");
    const inputRef = ref();
    const routeList = flatTree<MenuRouteRecord>(store.state.menu.headerMenu).filter((e) => e.meta.component !== "Main");

    function querySearch(queryString: string, cb: Function) {
      let results = routeList;
      if (queryString) {
        results = routeList.filter((item) => {
          return item.meta.title?.includes(queryString) || item.path.includes(queryString);
        });
      }
      cb(results);
    }
    async function showInput() {
      inputVisible.value = true;
      await nextTick();
      inputRef.value.focus();
    }
    function closeInput() {
      inputVisible.value = false;
      searchKey.value = "";
    }
    function handleSelect(item: MenuRouteRecord) {
      menuClick(item);
      closeInput();
    }
    function handleBlur() {
      setTimeout(() => {
        closeInput();
      }, 200);
    }

    return {
      inputVisible,
      searchKey,
      inputRef,
      showInput,
      querySearch,
      closeInput,
      handleSelect,
      handleBlur
    };
  }
});
</script>

<style lang="" scoped></style>
