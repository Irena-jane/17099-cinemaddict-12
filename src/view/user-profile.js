import {createElement} from "../utils";

const getUserRating = (count) => {
  let rating = ``;
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

const createUserProfileTemplate = (watchedFilmsCount) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRating(watchedFilmsCount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile {
  constructor(watchedFilmsCount) {
    this._watchedFilmsCount = watchedFilmsCount;
    this._element = null;
  }
  getTemplate() {
    return createUserProfileTemplate(this._watchedFilmsCount);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
