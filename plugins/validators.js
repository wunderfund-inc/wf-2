export const validPostal = val => {
  if (val === null) return null;
  const reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return reg.test(val);
};
