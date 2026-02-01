import {
  isObject,
} from "../lang";

/**
 * Creates an object that inherits from the prototype object. If a properties
 * object is given, its own enumerable string keyed properties are assigned to
 * the created object.
 *
 * @param {Object} prototype - The object to inherit from.
 * @param {Object} [properties] - The properties to assign to the object.
 * @return {Object} Returns the new object.
 *
 * @example
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * function Circle() {
 *   Shape.call(this);
 * }
 *
 * Circle.prototype = create(Shape.prototype, { constructor: Circle });
 */
export const create = (
  prototype: unknown,
  properties?: Record<string, unknown>,
): Record<string, unknown> => {
  const result = prototype === null
    ? Object.create(null)
    : (isObject(prototype)
      ? Object.create(prototype as object)
      : Object.create(Object.prototype));

  if (!properties || !isObject(properties)) {
    return result;
  }

  const keys = Object.keys(properties);
  for (const key of keys) {
    result[key] = properties[key];
  }

  return result;
};
