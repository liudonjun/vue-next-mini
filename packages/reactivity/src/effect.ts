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