export const validateEmail = (email) => {
  const valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return valid.test(email);
};

export const validateUserName = (name) => {
  const valid = /^[ㄱ-ㅎ가-힣][^#&<>\"~;$^%{}?]{1,10}$/
  return valid.test(name);
};

export const validatePassword = (password) => {
  const valid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{6,}/
  return valid.test(password);
};