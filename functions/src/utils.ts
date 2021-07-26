/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * object diffs
 *
 * @param obj1 object 1
 * @param obj2 object 2
 * @returns the diff
 */

export function diff(
    obj1: any,
    obj2: any
): { [key: string]: any } | undefined {
  const result: { [key: string]: any } = {};
  if (Object.is(obj1, obj2)) {
    return undefined;
  }
  if (!obj2 || typeof obj2 !== "object") {
    return obj2;
  }
  Object.keys(obj1 || {})
      .concat(Object.keys(obj2 || {}))
      .forEach((key) => {
        if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
          result[key] = obj2[key];
        }
        if (typeof obj2[key] === "object" && typeof obj1[key] === "object") {
          const value = diff(obj1[key], obj2[key]);
          if (value !== undefined) {
            result[key] = value;
          }
        }
      });
  return result;
}
