import { UserModel } from "./user";
import request from "@/utils/axios";

export interface LoginModel {
  username: string;
  password: string;
  captcha: string;
}

export interface ResetPswModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface LoginResult {
  token: string;
  userInfo: any;
}

export function userLogin(data: LoginModel): Promise<LoginResult> {
  return request.post("/account/login", data);
}

export function resetPassword(data: ResetPswModel) {
  return request.put("/account/resetPsw", data);
}

export function getCurrent(): Promise<UserModel> {
  return request.get("/account/current");
}

export function getCaptcha() {
  return request.get("/account/captcha");
}
