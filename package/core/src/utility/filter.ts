export const filterUndefinedKeys = <T extends Record<string, unknown>>(obj: T) => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
  return obj;
};
