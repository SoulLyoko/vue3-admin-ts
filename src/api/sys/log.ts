import { PageModel } from "../model/page";
import request from "@/utils/axios";

export interface LogModel {
  _id?: string;
  method?: string;
  url?: string;
  summary?: string;
  ip?: string;
  time?: string;
  params?: string;
  username?: string;
  userAgent?: string;
  status?: number;
  type?: string;
  error?: string;
}

export function getList(params: LogModel & PageModel): Promise<LogModel[]> {
  return request.get("/log", { params });
}

export function getLoginLog(params: LogModel & PageModel): Promise<LogModel[]> {
  return request.get("/log", { params: { ...params, type: "login" } });
}

export function getActionLog(params: LogModel & PageModel): Promise<LogModel[]> {
  return request.get("/log", { params: { ...params, type: "action" } });
}

export function getErrorLog(params: LogModel & PageModel): Promise<LogModel[]> {
  return request.get("/log", { params: { ...params, status: 0 } });
}

export const getLogList = {
  login: getLoginLog,
  action: getActionLog,
  error: getErrorLog
};
