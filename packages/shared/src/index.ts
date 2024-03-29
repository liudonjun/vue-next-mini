/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray
/**
 * 判断是否是一个对象
 * @param val 
 */
export const isObject = (val: unknown) => val !== null && typeof val === 'object'

/**
 * 对比两个数据是否发生改变
 * @param value 
 * @param oldValue 
 * @returns 
 */
export const hasChanged = (value: any, oldValue: any) => !Object.is(value, oldValue)