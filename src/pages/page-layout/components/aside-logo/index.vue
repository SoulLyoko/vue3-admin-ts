<template>
  <div class="aside-logo">
    <span v-if="!isCollapse">Egg Admin</span>
    <span v-else>Egg</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { menuState } from "@/store";

export default defineComponent({
  name: "aside-logo",
  setup() {
    const isCollapse = computed(() => menuState.isCollapse);

    return { isCollapse };
  }
});
</script>

<style lang="" scoped></style>
