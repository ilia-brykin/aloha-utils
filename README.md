# @aloha/utils

Modern, ESM-only utility functions for the aloha ecosystem and frontend apps.

## Install

```bash
npm install @aloha/utils
```

## ESM-only

This package is ESM-only and ships named exports only.

## Quick usage

```ts
import { isPlainObject, isNumber, isNaN } from "@aloha/utils";

if (isPlainObject(value)) {
  // value is Record<string, unknown>
}

if (isNumber(value)) {
  // NaN is excluded
}

if (isNaN(value)) {
  // value is NaN
}
```

## Philosophy / Non-goals

- Small, opinionated toolkit (not a lodash clone)
- No CommonJS output or legacy polyfills
- No Node-only helpers by default

## Exports (v0.1)

Predicates:

- `isArray`
- `isArrayBuffer`
- `isBoolean`
- `isDate`
- `isElement`
- `isError`
- `isFinite`
- `isFunction`
- `isInteger`
- `isMap`
- `isNaN`
- `isNil`
- `isNull`
- `isNumber` (excludes NaN)
- `isObjectLike`
- `isPlainObject`
- `isRegExp`
- `isSet`
- `isString`
- `isUndefined`
- `isWeakMap`
- `isWeakSet`
