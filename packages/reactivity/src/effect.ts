/**
 * 依赖收集
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
  console.log('依赖收集');

}

/**
 * 触发更新
 * @param target 
 * @param key 
 * @param value 
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('触发更新');

}