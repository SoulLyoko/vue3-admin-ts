<template>
  <basic-container class="page-home">
    <p>
      <b>应用名称</b>
      <span>{{ title }}</span>
    </p>
    <p>
      <b>版本信息</b>
      <span>{{ appVersion }}</span>
    </p>
    <p v-for="(value, key) in sysInfo" :key="key">
      <b>{{ key }}</b>
      <span>{{ value }}</span>
    </p>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getSysInfo } from "@/api/sys/sysinfo";
import pkgJson from "@/../package.json";

export default defineComponent({
  setup() {
    const sysInfo = ref({});
    const appVersion = pkgJson.version;
    const { VUE_APP_TITLE } = process.env;

    getSysInfo().then((res) => {
      sysInfo.value = res.data;
    });

    return { sysInfo, appVersion, title: VUE_APP_TITLE };
  }
});
</script>

<style lang="scss" scoped>
.page-home {
  p {
    b {
      margin-right: 10px;
    }
  }
}
</style>
