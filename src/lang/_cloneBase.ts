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

const TypedArrayMap = {
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

type CloneOptions = {
  deep: boolean;
};

const cloneRegExp = (value: RegExp): RegExp => {
  const cloned = new RegExp(value.source, value.flags);
  cloned.lastIndex = value.lastIndex;
  return cloned;
};

const cloneTypedArray = (value: ArrayBufferView, deep: boolean): ArrayBufferView => {
  const Ctor = value.constructor as new (
    buffer: ArrayBufferLike,
    byteOffset?: number,
    length?: number,
  ) => ArrayBufferView;
  const buffer = deep ? value.buffer.slice(0) : value.buffer;
  return new Ctor(buffer, value.byteOffset, (value as { length?: number }).length);
};

const cloneDataView = (value: DataView, deep: boolean): DataView => {
  const buffer = deep ? value.buffer.slice(0) : value.buffer;
  return new DataView(buffer, value.byteOffset, value.byteLength);
};

const cloneBaseInternal = (value: unknown, stack: WeakMap<object, unknown>, options: CloneOptions): unknown => {
  const { deep } = options;

  if (!isObject(value)) {
    return value;
  }

  if (isFunction(value) || isError(value) || isElement(value) || isWeakMap(value) || isWeakSet(value)) {
    return {};
  }

  if (deep) {
    const cached = stack.get(value);
    if (cached) {
      return cached;
    }
  }

  if (isArray(value)) {
    if (!deep) {
      return value.slice();
    }

    const result: unknown[] = new Array(value.length);
    stack.set(value, result);
    for (let i = 0; i < value.length; i += 1) {
      result[i] = cloneBaseInternal(value[i], stack, options);
    }
    return result;
  }

  if (isMap(value)) {
    const result = new Map();
    if (deep) {
      stack.set(value, result);
      value.forEach((subValue, key) => {
        result.set(key, cloneBaseInternal(subValue, stack, options));
      });
    } else {
      value.forEach((subValue, key) => {
        result.set(key, subValue);
      });
    }
    return result;
  }

  if (isSet(value)) {
    const result = new Set();
    if (deep) {
      stack.set(value, result);
      value.forEach(subValue => {
        result.add(cloneBaseInternal(subValue, stack, options));
      });
    } else {
      value.forEach(subValue => {
        result.add(subValue);
      });
    }
    return result;
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

  if (isArguments(value)) {
    const result: Record<PropertyKey, unknown> = {};
    if (deep) {
      stack.set(value, result);
    }
    copyEnumerable(value, result, stack, deep);
    return result;
  }

  const tag = objectToString.call(value);

  if (tag === dataViewTag) {
    return cloneDataView(value as DataView, deep);
  }

  if (tag in TypedArrayMap) {
    return cloneTypedArray(value as ArrayBufferView, deep);
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
  if (deep) {
    stack.set(value, result);
  }
  copyEnumerable(value, result, stack, deep);
  return result;
};

function copyEnumerable(
  source: object,
  target: Record<PropertyKey, unknown>,
  stack: WeakMap<object, unknown>,
  deep: boolean,
): void {
  for (const key of Object.keys(source)) {
    target[key] = deep
      ? cloneBaseInternal((source as Record<string, unknown>)[key], stack, { deep })
      : (source as Record<string, unknown>)[key];
  }

  const symbols = Object.getOwnPropertySymbols(source);
  for (const sym of symbols) {
    if (Object.prototype.propertyIsEnumerable.call(source, sym)) {
      target[sym] = deep
        ? cloneBaseInternal((source as Record<PropertyKey, unknown>)[sym], stack, { deep })
        : (source as Record<PropertyKey, unknown>)[sym];
    }
  }
}

export const cloneBase = (value: unknown, options: CloneOptions): unknown => {
  const stack = new WeakMap<object, unknown>();
  return cloneBaseInternal(value, stack, options);
};
