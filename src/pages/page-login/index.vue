<template>
  <div class="login-page">
    <div class="login-form">
      <center>
        <h1>
          <img class="login-logo" src="/img/logo.png" />
          <span>{{ title }}</span>
        </h1>
        <div>用户登录</div>
      </center>
      <br />
      <el-form :model="form" ref="formRef" :rules="rules" @submit.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" prefix-icon="el-icon-picture-outline-round" placeholder="验证码">
            <template #append>
              <div class="login-captcha" @click="refreshCaptcha" v-html="captchaSVG" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" native-type="submit" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { getCaptcha } from "@/api/sys/account";

export default defineComponent({
  name: "page-login",
  setup() {
    const { VUE_APP_TITLE } = process.env;
    const formRef = ref();
    const route = useRoute();
    const router = useRouter();
    const captchaSVG = ref("");
    const form = ref({ username: "", password: "", captcha: "" });
    const rules = {
      username: [{ required: true, message: "请输入用户名" }],
      password: [{ required: true, message: "请输入密码" }],
      captcha: [{ required: true, message: "请输入验证码" }]
    };

    function refreshCaptcha() {
      form.value.captcha = "";
      getCaptcha().then((res) => {
        captchaSVG.value = res.data;
      });
    }
    function handleLogin() {
      formRef.value
        .validate()
        .then(() => store.dispatch("login", form.value))
        .then(() => router.push((route.query.redirect as string) || "/"))
        .catch(() => refreshCaptcha());
    }

    refreshCaptcha();

    return {
      title: VUE_APP_TITLE,
      formRef,
      captchaSVG,
      form,
      rules,
      refreshCaptcha,
      handleLogin
    };
  }
});
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: url("/img/background.svg") no-repeat fixed center;
  background-size: 100%;
  .login-form {
    width: 300px;
    margin: 0 auto;
    padding-top: 200px;
    .login-logo {
      height: 40px;
      vertical-align: bottom;
    }
    .login-captcha {
      height: 40px - 2px;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      cursor: pointer;
    }
  }
  .login-button {
    width: 100%;
  }
}
</style>
