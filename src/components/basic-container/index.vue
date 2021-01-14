<template>
  <div class="basic-container" :class="type">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * @component 基础容器
 * @prop {String} type 容器模式:card卡片,full高度填满主区域,ghost透明背景
 */
export default defineComponent({
  name: "basic-container",
  props: {
    type: {
      type: String,
      default: "card"
    }
  }
});
</script>

<style lang="scss">
.basic-container {
  &.card {
    background-color: #fff;
    padding: 20px;
    max-height: calc(100% - 41px);
    overflow: auto;
  }
  &.full {
    height: calc(100% - 40px);
    background-color: #fff;
    padding: 20px;
    overflow: auto;
  }
  &.ghost {
    height: 100%;
    overflow: auto;
  }
}
</style>
