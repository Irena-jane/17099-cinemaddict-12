import {CARD_FILTERS} from "../const";
import Abstract from "./abstract";

const formatFilmDate = (date) => {
  const _day = date.getDate();
  const day = _day <= 9 ? `0${_day}` : _day;
  const month = date.toLocaleString(`en-US`, {month: `long`, year: `numeric`});
  return `${day} ${month}`;
};
const formatCommentDate = (date) => {
  const dayMonthYear = date
    .toLocaleString(`ru-RU`, {day: `numeric`, month: `numeric`, year: `numeric`})
    .split(`.`)
    .reverse()
    .join(`/`);
  const time = date.toLocaleString(`ru-RU`, {hour: `2-digit`, minute: `2-digit`});
  return `${dayMonthYear} ${time}`;
};
const makeSingleOrPlural = (arr) => {
  return arr.length === 1 ? `` : `s`;
};

const createGenresTemplate = (genres) => {
  return `<td class="film-details__cell">
          ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
          </td>`;
};

const createControlsTemplate = (...filters) => {

  return filters.map((filter, i) => {
    return {
      name: CARD_FILTERS[i][`name`],
      type: CARD_FILTERS[i][`type`],
      checked: filter
    };
  })
    .map((filter) => `<input type="checkbox" class="film-details__control-input visually-hidden" id="${filter.name}" name="${filter.type}" ${filter.checked ? `checked` : ``}>
    <label for="${filter.name}" class="film-details__control-label film-details__control-label--${filter.name}">Add to ${filter.name}</label>`)
    .join(``);

};

const createCommentsTemplate = (comments) => {

  return comments.map((comment) => {
    const date = formatCommentDate(comment.date);
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  })
  .join(``);
};

const createFilmDetailsTemplate = (film) => {
  const {title, original, poster, rating, date, duration, genres, age, director, writers, actors, country, description, comments, isWatched, isInWatchlist, isFavorite} = film;
  const genresTemplate = createGenresTemplate(genres);
  const controlsTemplate = createControlsTemplate(isInWatchlist, isWatched, isFavorite);

  const commentsTemplate = createCommentsTemplate(comments);
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writer${makeSingleOrPlural(writers)}</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatFilmDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${makeSingleOrPlural(genres)}</td>
              ${genresTemplate}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
      ${controlsTemplate}
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._controlsChangeHandler = this._controlsChangeHandler.bind(this);
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }
  _closeBtnClickHandler(e) {
    e.preventDefault();
    this._callback.closeBtnClick();
  }
  _controlsChangeHandler(e) {
    e.preventDefault();
    console.log(e.target);
    const controlType = e.target.name;
    this._callback.controlsChange(controlType);
  }
  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeBtnClickHandler);
  }
  setControlsChangeHandler(callback) {
    this._callback.controlsChange = callback;
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`change`, this._controlsChangeHandler);
  }
}
