export const objectPurifier = (obj: Record<string, unknown>) => {
  if (!obj) return undefined;
  const purifiedObj = {} as Record<string, unknown>;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (
      (Array.isArray(value) && value.length === 0) ||
      (Array.isArray(value) &&
        value.every((v) => typeof v == "string" && v.trim() === "")) ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && value === 0) ||
      value === null ||
      value === undefined
    ) {
      return;
    }
    purifiedObj[key] = value;
  });
  if (Object.keys(purifiedObj).length === 0) return undefined;
  return purifiedObj;
};
