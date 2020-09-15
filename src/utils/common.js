
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
export const sortDateDown = (filmA, filmB) => {
  return filmB.date.getTime() - filmA.date.getTime();
};
export const sortRatingDown = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
export const sortCommentsDown = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};
export const updateItem = (list, update) => {
  const index = list.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return list;
  }
  return [
    ...list.slice(0, index),
    update,
    ...list.slice(index + 1)
  ];
};
