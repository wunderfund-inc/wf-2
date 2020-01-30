export const validPostal = val => {
  if (val === null) return null;
  const reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return val === null ? val : reg.test(val);
};

export const validMethodExtras = state => {
  if (state.selectedMethod === "ACH") {
    const validAccountNumber = true;
    const validRoutingNumber = true;

    return validAccountNumber && validRoutingNumber;
  } else if (state.selectedMethod === "CC") {
    const regexCVV = /^[0-9]{3,4}$/;
    const validCVV = regexCVV.test(state.cc.cvv);
    const validMonth =
      Number(state.cc.expiry.month) > 0 && Number(state.cc.expiry.month) < 13;
    const validYear = state.cc.expiry.year === 20;

    return validMonth && validYear && validCVV;
  } else if (state.selectedMethod === "CRYPTO") {
    const validEthereumAddress = true;

    return validEthereumAddress;
  }
  return false;
};

export const validEmail = val => {
  const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return val === null ? val : reg.test(val);
};
