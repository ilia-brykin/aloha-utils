import {
  forEachCollectionValue,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "./_iterateeHelpers.js";

const normalizeIteratees = (
  iteratees?: Array<CollectionIteratee> | CollectionIteratee,
): Array<CollectionIteratee> => {
  if (iteratees === undefined) {
    return [value => value];
  }

  return Array.isArray(iteratees)
    ? (iteratees as CollectionIteratee[])
    : [iteratees];
};

const normalizeOrders = (
  orders?: string[] | string,
  length: number = 0,
): string[] => {
  if (orders === undefined) {
    return Array.from({ length }, () => "asc");
  }

  const list = Array.isArray(orders) ? orders : [orders];
  if (list.length >= length) {
    return list;
  }

  return [...list, ...Array.from({ length: length - list.length }, () => "asc")];
};

/**
 * This method is like sortBy except that it allows specifying sort orders.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Array|Function|string} [iteratees] - The iteratees to sort by.
 * @param {Array} [orders] - The sort orders of iteratees.
 * @return {Array} The new sorted array.
 *
 * @example
 * orderBy([{ user: "fred", age: 48 }, { user: "barney", age: 34 }], ["user", "age"], ["asc", "desc"]);
 */
export const orderBy = (
  collection: unknown,
  iteratees?: Array<CollectionIteratee> | CollectionIteratee,
  orders?: string[] | string,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const resolvedIteratees = normalizeIteratees(iteratees)
    .map(iteratee => resolveCollectionIteratee(iteratee));
  const resolvedOrders = normalizeOrders(orders, resolvedIteratees.length);

  const result: Array<{ value: unknown; index: number; criteria: unknown[] }> = [];
  let idx = 0;

  forEachCollectionValue(collection, (value, key, source) => {
    const criteria = resolvedIteratees.map(iteratee => iteratee(value, key, source));
    result.push({ value, index: idx, criteria });
    idx += 1;
  });

  result.sort((a, b) => {
    for (let i = 0; i < a.criteria.length; i += 1) {
      const left = a.criteria[i] as number | string;
      const right = b.criteria[i] as number | string;
      if (left === right) {
        continue;
      }
      const order = resolvedOrders[i] === "desc" ? -1 : 1;
      if (left < right) {
        return -1 * order;
      }
      if (left > right) {
        return 1 * order;
      }
    }
    return a.index - b.index;
  });

  return result.map(item => item.value);
};
