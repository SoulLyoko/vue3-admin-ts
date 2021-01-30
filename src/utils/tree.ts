/**
 * 树扁平化，多级树扁平为一维数组
 * @param {array} tree 树数组
 * @param {string} childrenKey 子数组的key
 * @returns {array} 扁平化后的一维数组
 */
export function flatTree<T>(tree: any[], childrenKey = "children"): T[] {
  return tree
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
 * 过滤树节点
 * @param {array} tree 树数组
 * @param {function} fn 传入的方法,相当于Array.filter,返回true或false
 * @param {string} childrenKey 子数组的key
 * @returns {array} 过滤出的节点
 */
export function filterTreeNode<T>(tree: any[], fn: (arg0: T) => {}, childrenKey = "children"): T[] {
  const list = [...tree];
  const result = [];
  for (const node of list) {
    fn(node) && result.push(node);
    node[childrenKey] && list.push(...node[childrenKey]);
  }
  return result;
}

/**
 * 查找树节点
 * @param {array} tree 树数组
 * @param {function} fn 传入方的法,相当于Array.find,返回true或false
 * @param {string} childrenKey 子数组的key
 * @returns {object|null} 查找到的节点
 */
export function findTreeNode<T>(tree: any[], fn: (arg0: T) => {}, childrenKey = "children"): T | null {
  const list = [...tree];
  for (const node of list) {
    if (fn(node)) return node;
    node[childrenKey] && list.push(...node[childrenKey]);
  }
  return null;
}
