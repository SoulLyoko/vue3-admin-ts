/**
 * 驼峰转下划线
 * @param {string} name 要转换的字符串 eg:createTime
 * @returns {string} 转换后的字符串 eg:create_time
 */
export function humpToLine(name: string): string {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 下划线转驼峰
 * @param {string} name 要转换的字符串 eg:create_time
 * @returns {string} 转换后的字符串 eg:createTime
 */
export function lineToHump(name: string): string {
  return name.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}
