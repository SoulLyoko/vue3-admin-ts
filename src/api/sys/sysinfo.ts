import request from "@/utils/axios";

export function getSysInfo() {
  return request.get("/sys/info");
}
