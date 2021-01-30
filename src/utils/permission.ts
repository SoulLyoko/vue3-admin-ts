import { storage } from "./cache";
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
