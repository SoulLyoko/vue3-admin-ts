<template>
  <basic-container type="ghost">
    <iframe :src="src" frameborder="0" height="99.5%" width="100%" style="background-color: #fff"></iframe>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const src = ref("");

    watch(
      route,
      (val) => {
        src.value = val.meta.url;
      },
      { immediate: true }
    );

    return { src };
  }
});
</script>
