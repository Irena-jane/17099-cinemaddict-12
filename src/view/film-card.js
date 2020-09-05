import {limitFilmDescription} from "../utils/common";
import Abstract from "./abstract";

const filterActiveClassName = (filter) => {
  return filter ? `film-card__controls-item--active` : ``;
};

const createFilmCardTemplate = (film) => {
  const {title, poster, description, rating, date, duration, genres, comments, isInWatchlist, isWatched, isFavorite} = film;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date.getFullYear()}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${limitFilmDescription(description)}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${filterActiveClassName(isInWatchlist)}">Add to
            watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${filterActiveClassName(isWatched)}">Mark as
            watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${filterActiveClassName(isFavorite)}">Mark as
            favorite</button>
        </form>
      </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._cardClickHandler = this._cardClickHandler.bind(this);
  }
  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
  _cardClickHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (!target.classList.contains(`film-card__title`)
      && !target.classList.contains(`film-card__comments`)
      && !target.classList.contains(`film-card__poster`)) {
      return;
    }
    this._callback.cardClick(this._film);
  }
  setShowDetailsClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().addEventListener(`click`, this._cardClickHandler);
  }
}

