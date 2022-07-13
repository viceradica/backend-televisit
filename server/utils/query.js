import query from '../constants/query';

const { AVAILABLE, CASE_INSENSITIVE, LIMIT, PAGE, ROLE } = query;

export function buildQuery(searchParams) {

  const dbQuery = {};

  for (const key of searchParams.keys()) {
    if (key === PAGE || key === LIMIT) {
      continue;
    }
    dbQuery[key] = parseQueryKey(key, searchParams.get(key));
  }

  return { dbQuery };
}

function parseQueryKey(key, value) {
  if (key === AVAILABLE || key === ROLE) {
    return value;
  }
  return { $regex: value, $options: CASE_INSENSITIVE };
}