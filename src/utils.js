export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomString = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};
export const getRandomUniqueStringArr = (arr, maxLength = 5, minLength = 1) => {
  const stringArr = Array(getRandomInteger(minLength, maxLength - 1))
    .fill().map(() => getRandomString(arr));
  const stringSet = new Set(stringArr);
  return Array.from(stringSet);
};
export const limitFilmDescription = (text) => {
  if (text.length >= 140) {
    return text.slice(0, 139) + `…`;
  }
  return text;
};

export const generateDate = (dateFrom = new Date(1960, 0, 1)) => {
  const dateTo = new Date();
  const date = getRandomInteger(dateFrom.getTime(), dateTo.getTime());
  return new Date(date);
};
