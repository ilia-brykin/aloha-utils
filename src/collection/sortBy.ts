import {
  forEachCollectionValue,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "./_iterateeHelpers.js";

const normalizeIteratees = (
  iteratees?: CollectionIteratee | Array<CollectionIteratee>,
): Array<CollectionIteratee> => {
  if (iteratees === undefined) {
    return [value => value];
  }

  return Array.isArray(iteratees)
    ? (iteratees as CollectionIteratee[])
    : [iteratees];
};

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Array|Function|string} [iteratees] - The iteratees to sort by.
 * @return {Array} The new sorted array.
 *
 * @example
 * sortBy([{ user: "fred" }, { user: "barney" }], "user");
 */
export const sortBy = (
  collection: unknown,
  iteratees?: CollectionIteratee | Array<CollectionIteratee>,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const resolvedIteratees = normalizeIteratees(iteratees)
    .map(iteratee => resolveCollectionIteratee(iteratee));
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
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }
    }
    return a.index - b.index;
  });

  return result.map(item => item.value);
};
