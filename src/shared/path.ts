type PathKey = string | number;

const parseBracket = (path: string, start: number): { key: PathKey; end: number } | null => {
  let i = start + 1;
  if (i >= path.length) {
    return null;
  }

  const next = path[i];
  if (next === "'" || next === "\"") {
    const quote = next;
    let value = "";
    let escaped = false;
    i += 1;

    while (i < path.length) {
      const c = path[i];
      if (escaped) {
        value += c;
        escaped = false;
        i += 1;
        continue;
      }

      if (c === "\\") {
        escaped = true;
        i += 1;
        continue;
      }

      if (c === quote) {
        i += 1;
        break;
      }

      value += c;
      i += 1;
    }

    while (i < path.length && path[i] === " ") {
      i += 1;
    }

    if (i >= path.length || path[i] !== "]") {
      return null;
    }

    return { key: value, end: i + 1 };
  }

  let raw = "";
  while (i < path.length && path[i] !== "]") {
    raw += path[i];
    i += 1;
  }

  if (i >= path.length || path[i] !== "]") {
    return null;
  }

  if (raw.length === 0) {
    return null;
  }

  const key = /^-?\\d+$/.test(raw) ? Number(raw) : raw;
  return { key, end: i + 1 };
};

export const toPath = (path: string): PathKey[] => {
  if (path === "") {
    return [];
  }

  const result: PathKey[] = [];
  let current = "";
  let i = 0;

  const pushCurrent = () => {
    if (current.length > 0) {
      result.push(current);
      current = "";
    }
  };

  while (i < path.length) {
    const ch = path[i];

    if (ch === ".") {
      pushCurrent();
      i += 1;
      continue;
    }

    if (ch === "[") {
      pushCurrent();
      const parsed = parseBracket(path, i);
      if (!parsed) {
        current += path.slice(i);
        break;
      }

      result.push(parsed.key);
      i = parsed.end;
      continue;
    }

    current += ch;
    i += 1;
  }

  pushCurrent();
  return result;
};
