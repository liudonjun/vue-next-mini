import { hasChanged } from "@vue/shared"
import { Dep, createDep } from "./dep"
import { activeEffect, trackEffects, triggerEffects } from "./effect"
import { toReactive } from "./reactive"

export interface Ref<T = any> {
  value: T
}


function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }

  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined

  public readonly __v__isRef = true

  constructor(value: T, public readonly __v__isShallow: boolean) {
    this._rawValue = value
    this._value = __v__isShallow ? value : toReactive(value)
  }

  set value(newValue: T) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = toReactive(newValue)
      triggerRefValue(this)
    }
  }

  get value() {
    trackRefValue(this)
    return this._value
  }
}

/**
 * 触发依赖
 * @param ref 
 */
export function triggerRefValue(ref) {
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}

/**
 * 收集依赖
 * @param ref 
 */
export function trackRefValue(ref) {
  if (activeEffect) {
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}


/**
 * 是否为 ref
 * @param r 
 * @returns 
 */
export function isRef(r: any): r is Ref {
  return !!(r && r.__v__isRef === true)
}

export function ref(value?: unknown) {
  return createRef(value, false)
}

