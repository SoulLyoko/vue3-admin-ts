<template>
  <router-view #default="{Component,route}">
    <keep-alive v-if="route.meta.cache">
      <component :is="Component"></component>
    </keep-alive>
    <component :is="Component" v-else></component>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
