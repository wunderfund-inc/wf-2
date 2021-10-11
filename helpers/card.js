export const VISA_REGEX = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
export const MASTERCARD_REGEX = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
export const DISCOVER_REGEX =
  /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;
export const AMEX_REGEX = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;

export const determineCard = (cardNumber) => {
  if (VISA_REGEX.test(cardNumber)) return "VI";
  if (MASTERCARD_REGEX.test(cardNumber)) return "MC";
  if (DISCOVER_REGEX.test(cardNumber)) return "DI";
  if (AMEX_REGEX.test(cardNumber)) return "AE";
  return null;
};

export const validCard = (cardNumber) => {
  return ["VI", "MC", "DI"].includes(determineCard(cardNumber));
};
