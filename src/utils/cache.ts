import jscookie, { CookieAttributes } from "js-cookie";
import pkgJson from "@/../package.json";

function getKey(key: string) {
  return `${pkgJson.name}-${pkgJson.version}-${key}`;
}

/**
 * 浏览器本地缓存封装
 * @method set(key,value) 设置数据
 * @method get(key) 获取数据
 * @method remove(key) 删除数据
 * @method clear() 清空数据
 */
export const storage = {
  set(key: string, value: any) {
    if (!value) return;
    localStorage.setItem(getKey(key), JSON.stringify(value));
  },
  get(key: string) {
    const value = localStorage.getItem(getKey(key));
    return value ? JSON.parse(value) : value;
  },
  remove(key: string) {
    localStorage.removeItem(getKey(key));
  },
  clear() {
    localStorage.clear();
  }
};

/**
 * 浏览器cookie封装
 * @method set(key,value,config) 设置数据
 * @method get(key) 获取数据
 * @method remove(key) 删除数据
 */
export const cookie = {
  set(key: string, value: any, config: CookieAttributes = {}) {
    if (!value) return;
    jscookie.set(getKey(key), value, { expires: 1, ...config });
  },
  get(key: string) {
    return jscookie.get(getKey(key));
  },
  remove(key: string) {
    jscookie.remove(getKey(key));
  }
};
