import {
  isArguments,
} from "./isArguments.js";
import {
  isArray,
} from "./isArray.js";
import {
  isArrayBuffer,
} from "./isArrayBuffer.js";
import {
  isBuffer,
} from "./isBuffer.js";
import {
  isDate,
} from "./isDate.js";
import {
  isElement,
} from "./isElement.js";
import {
  isError,
} from "./isError.js";
import {
  isFunction,
} from "./isFunction.js";
import {
  isMap,
} from "./isMap.js";
import {
  isObject,
} from "./isObject.js";
import {
  isRegExp,
} from "./isRegExp.js";
import {
  isSet,
} from "./isSet.js";
import {
  isWeakMap,
} from "./isWeakMap.js";
import {
  isWeakSet,
} from "./isWeakSet.js";
import {
  toString as objectToString,
} from "./_shared.js";

const arrayBufferTag = "[object ArrayBuffer]";
const dataViewTag = "[object DataView]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";

const TypedArrayShallow = {
  "[object Float32Array]": true,
  "[object Float64Array]": true,
  "[object Int8Array]": true,
  "[object Int16Array]": true,
  "[object Int32Array]": true,
  "[object Uint8Array]": true,
  "[object Uint8ClampedArray]": true,
  "[object Uint16Array]": true,
  "[object Uint32Array]": true,
  "[object BigInt64Array]": true,
  "[object BigUint64Array]": true,
} as const;

const copyEnumerable = (source: object, target: Record<PropertyKey, unknown>): void => {
  for (const key of Object.keys(source)) {
    target[key] = (source as Record<string, unknown>)[key];
  }

  const symbols = Object.getOwnPropertySymbols(source);
  for (const sym of symbols) {
    if (Object.prototype.propertyIsEnumerable.call(source, sym)) {
      target[sym] = (source as Record<PropertyKey, unknown>)[sym];
    }
  }
};

const cloneTypedArrayShallow = (value: ArrayBufferView): ArrayBufferView => {
  const Ctor = value.constructor as new (
    buffer: ArrayBufferLike,
    byteOffset?: number,
    length?: number,
  ) => ArrayBufferView;
  return new Ctor(value.buffer, value.byteOffset, (value as { length?: number }).length);
};

const cloneRegExp = (value: RegExp): RegExp => {
  const cloned = new RegExp(value.source, value.flags);
  cloned.lastIndex = value.lastIndex;
  return cloned;
};

/**
 * Creates a shallow clone of value.
 *
 * Note: This method is loosely based on the structured clone algorithm and
 * supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
 * The own enumerable properties of arguments objects are cloned as plain
 * objects. An empty object is returned for uncloneable values such as error
 * objects, functions, DOM nodes, and WeakMaps.
 *
 * @param {*} value - The value to clone.
 * @return {*} Returns the cloned value.
 *
 * @example
 * const objects = [{ a: 1 }, { b: 2 }];
 * const shallow = clone(objects);
 * shallow[0] === objects[0]; // true
 */
export function clone(value: unknown): unknown {
  if (!isObject(value)) {
    return value;
  }

  if (isFunction(value) || isError(value) || isElement(value) || isWeakMap(value) || isWeakSet(value)) {
    return {};
  }

  if (isArray(value)) {
    return value.slice();
  }

  if (isBuffer(value)) {
    return Buffer.from(value);
  }

  if (isArrayBuffer(value)) {
    return value.slice(0);
  }

  if (isDate(value)) {
    return new Date(value.getTime());
  }

  if (isRegExp(value)) {
    return cloneRegExp(value);
  }

  if (isMap(value)) {
    return new Map(value);
  }

  if (isSet(value)) {
    return new Set(value);
  }

  if (isArguments(value)) {
    const result: Record<PropertyKey, unknown> = {};
    copyEnumerable(value, result);
    return result;
  }

  const tag = objectToString.call(value);

  if (tag === dataViewTag) {
    const view = value as DataView;
    return new DataView(view.buffer, view.byteOffset, view.byteLength);
  }

  if (tag in TypedArrayShallow) {
    return cloneTypedArrayShallow(value as ArrayBufferView);
  }

  if (tag === boolTag || tag === numberTag || tag === stringTag) {
    const Ctor = (value as { constructor: new (arg: unknown) => unknown }).constructor;
    return new Ctor((value as { valueOf: () => unknown }).valueOf());
  }

  if (tag === symbolTag) {
    const symbolValue = (value as { valueOf: () => symbol }).valueOf();
    return Object(symbolValue);
  }

  if (tag === arrayBufferTag) {
    return (value as ArrayBuffer).slice(0);
  }

  const proto = Object.getPrototypeOf(value);
  const result: Record<PropertyKey, unknown> = Object.create(proto);
  copyEnumerable(value, result);
  return result;
}
