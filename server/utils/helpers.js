export function castTo(type, value) {
  const numericTypes = ["foreign_key", "number"];
  const stringLikeDataTypes = ["string", "text", "image"];
  const boolTypes = ["boolean"];
  if (numericTypes.includes(type)) {
    return Number(value);
  } else if (stringLikeDataTypes.includes(type)) {
    return value.toString();
  } else if (boolTypes.includes(type)) {
    return Boolean(value);
  } else {
    return value;
  }
}
