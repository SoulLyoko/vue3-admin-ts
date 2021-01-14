<template>
  <div class="header-theme" @click="open">
    <el-tooltip effect="dark" content="主题" placement="bottom">
      <i class="el-icon-brush"></i>
    </el-tooltip>
    <el-dialog title="主题设置" v-model="dialogVisible" width="30%" append-to-body>
      <el-radio-group v-model="themeName" @change="setThemeName">
        <el-radio v-for="theme in themeList" :key="theme.name" :label="theme.name">{{ theme.title }}</el-radio>
      </el-radio-group>
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false"> 确 定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import store, { appState } from "@/store";

export default defineComponent({
  name: "header-theme",
  setup() {
    const dialogVisible = ref(false);
    const themeName = computed(() => appState.themeName);
    const themeList = [
      { name: "default", title: "默认" },
      { name: "classic", title: "经典" }
    ];

    const setThemeName = (val: string) => store.commit("SET_THEME_NAME", val);
    const open = () => (dialogVisible.value = true);

    setThemeName(themeName.value);

    return {
      dialogVisible,
      themeName,
      themeList,
      setThemeName,
      open
    };
  }
});
</script>

<style lang="" scoped></style>
