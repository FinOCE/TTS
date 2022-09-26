/**
 * Determine if a value matches the given type
 */
export function is<T>(
  value: any,
  callback: (value: any) => boolean
): value is T {
  return callback(value)
}

/**
 * Determine if a value does not match the given type
 */
export function isNot<T>(
  value: any,
  callback: (value: any) => boolean
): value is T {
  return !callback(value)
}
