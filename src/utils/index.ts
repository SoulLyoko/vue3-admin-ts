import { storage } from "./cache";

/**
 * 生成uuid
 * @param {number} length 长度
 * @param {number} radix 基数长度
 * @returns {string} 生成的uuid
 */
export function genUuid(length = 16, radix: number): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomNum = radix || chars.length;
  const uuid = [];
  for (let i = 0; i < length; i++) {
    uuid[i] = chars.charAt(Math.random() * randomNum);
  }
  return uuid.join("");
}

/**
 * 树扁平化，多级树扁平为一维数组
 * @param {Array} treeArr 树数组
 */
export function flatTree<T>(treeArr: any[], childrenKey = "children"): T[] {
  return treeArr
    .map((item) => {
      if (item[childrenKey]?.length) {
        return [item, flatTree(item[childrenKey])];
      } else {
        return item;
      }
    })
    .flat(Infinity);
}

/**
 * 判断是否有权限
 * @param {string | string[]} permName
 * @returns {boolean}
 */
export function hasPerm(permName: string | string[]): boolean {
  const permissions = storage.get("permissions");
  if (!permissions || !permName) {
    return false;
  }
  if (Array.isArray(permName)) {
    return permName.every((p) => !!permissions[p]);
  }
  return !!permissions[permName];
}
