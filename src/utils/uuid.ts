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
