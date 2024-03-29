import { isObject } from "@vue/shared";
import { mutableHandlers } from "./baseHandlers";

/**
 * 响应性Map缓存对象
 * key: target
 * val: proxy
 */
export const reactiveMap = new WeakMap<object, any>()

/**
 * 为复杂数据类型，创建响应性对象
 * @param target 被代理对象
 * @returns 代理对象
 */
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

/**
 * 创建响应性对象
 * @param target 被代理对象
 * @param baseHandlers handler
 * @param proxyMap 
 * @returns 
 */
function createReactiveObject(target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
  // 如果该实例已经被代理，直接读取
  const existingProxy = proxyMap.get(target)

  if (existingProxy) {
    return existingProxy
  }

  //未被代理则生成proxy实例
  const proxy = new Proxy(target, baseHandlers)

  // 缓存代理对象
  proxyMap.set(target, proxy)

  return proxy
}

export const toReactive = <T extends unknown>(value: T): T => isObject(value) ? reactive(value as object) : value
