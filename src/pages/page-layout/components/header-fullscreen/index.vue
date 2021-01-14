<template>
  <div class="header-fullscreen" @click="toggleFullscreen">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <i class="el-icon-full-screen"></i>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "header-fullscreen",
  setup() {
    const toggleFullscreen = () => store.dispatch("toggleFullscreen");

    return { toggleFullscreen };
  }
});
</script>

<style lang="" scoped></style>
