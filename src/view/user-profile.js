export const createUserProfileTemplate = (watchedFilmsCount) => {

  const getUserRating = (count) => {
    let rating = `1111`;
    if (count >= 1) {
      rating = `Novice`;
    }
    if (count >= 11) {
      rating = `Fan`;
    }
    if (count >= 21) {
      rating = `Movie Buff`;
    }
    return rating;
  };

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRating(watchedFilmsCount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
