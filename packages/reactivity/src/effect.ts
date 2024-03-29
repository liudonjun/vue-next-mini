type KeyToDepMap = Map<any, ReactiveEffect>

/**
 * 收集所有的依赖WeakMap实例：
 * 1.key:响应性对象
 * 2.value:map对象
 *  1.key:响应对象的指定属性
 *  2.value:指定对象的指定属性的执行函数
 */
const targetMap = new WeakMap<any, KeyToDepMap>()

/**
 * 用于收集依赖的方法
 * @param target weakMap 的 key
 * @param key 代理对象的key,当依赖被触发时，需要根据key获取
 */
export function track(target: object, key: unknown) {
  // 当前不存在执行函数，则直接return
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  // 如果获取到的map不存在，则生成新的map对象，并把该对象赋值给对应的value
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  // 为指定map，指定key 设置回调函数
  depsMap.set(key, activeEffect)
  // 测试打印，查看数据结构
  console.log(targetMap);
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

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) { }

  run() {
    activeEffect = this
    return this.fn()
  }
}