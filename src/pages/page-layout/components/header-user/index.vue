<template>
  <div class="header-user">
    <el-dropdown>
      <span class="user-username">{{ userInfo.username || "未知用户" }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="open"><i class="el-icon-lock"></i>修改密码</el-dropdown-item>
          <el-dropdown-item @click="handleLogout"> <i class="el-icon-switch-button"></i>退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog title="修改密码" v-model="dialogVisible" width="30%" append-to-body>
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="formData.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formData.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
          <el-progress
            :percentage="strength.percentage"
            :format="strengthFormat"
            :status="strength.status"
            text-inside
            :stroke-width="14"
          ></el-progress>
        </el-form-item>
      </el-form>
      <template #footer>
        <center>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </center>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import store, { userState } from "@/store";
import { resetPassword } from "@/api/sys/account";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  name: "header-user",
  setup() {
    const formRef = ref();
    const dialogVisible = ref(false);
    const userInfo = computed(() => userState.userInfo);
    const formData = ref({
      newPassword: "",
      oldPassword: "",
      confirmPassword: ""
    });
    const formRules = {
      oldPassword: [{ required: true, message: "请输入旧密码" }],
      newPassword: [
        { required: true, message: "请输入新密码" },
        { min: 6, message: "长度不小于6个字符" }
      ],
      confirmPassword: [
        { required: true, message: "请输入新密码" },
        { min: 6, message: "长度不小于6个字符" },
        {
          validator: (rule: unknown, value: string, callback: Function) => {
            if (value !== formData.value.newPassword) {
              callback(new Error("两次输入的新密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    };
    const strengthMap: Record<number, { text: string; status: string }> = {
      0: { text: "", status: "" },
      20: { text: "很弱", status: "exception" },
      40: { text: "弱", status: "exception" },
      60: { text: "中", status: "warning" },
      80: { text: "强", status: "success" },
      100: { text: "很强", status: "primary" }
    };

    const strength = computed(() => {
      // 评级制判断密码强度 最高5
      let percentage: 0 | 20 | 40 | 60 | 80 | 100 = 0;
      const v = formData.value.newPassword;
      if (/\d/.test(v)) {
        percentage += 20; //数字
      }
      if (/[a-z]/.test(v)) {
        percentage += 20; //小写
      }
      if (/[A-Z]/.test(v)) {
        percentage += 20; //大写
      }
      if (/\W/.test(v)) {
        percentage += 20; //特殊字符
      }
      if (v.length >= 10) {
        percentage += 20;
      }
      return {
        strength: strengthMap[percentage].text,
        status: strengthMap[percentage].status,
        percentage
      };
    });

    const strengthFormat = () => strength.value.strength;
    async function open() {
      dialogVisible.value = true;
      await nextTick();
      formRef.value.resetFields();
    }
    function handleSubmit() {
      formRef.value.validate((valid: boolean) => {
        if (!valid) {
          return;
        }
        resetPassword(formData.value).then(() => {
          ElMessage.success("密码修改成功,请重新登录");
          setTimeout(() => {
            store.dispatch("logout");
          }, 1000);
        });
      });
    }
    async function handleLogout() {
      await ElMessageBox.confirm("确定要退出登录吗", "提示", { type: "warning" });
      store.dispatch("logout");
    }

    return {
      formRef,
      dialogVisible,
      userInfo,
      formData,
      formRules,
      strength,
      strengthFormat,
      open,
      handleSubmit,
      handleLogout
    };
  }
});
</script>

<style lang="" scoped></style>
