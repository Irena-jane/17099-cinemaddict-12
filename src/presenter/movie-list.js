
import FilmsSectionView from "../view/films-section";
import FilmsListView from "../view/films-list";
import FilmsListExtraView from "../view/films-list-extra";
import FilmCardView from "../view/film-card";
import ShowMoreBtnView from "../view/show-more-btn";
import FilmDetailsView from "../view/film-details";
import NoFilmsView from "../view/no-films";

import {render, remove} from "../utils/render";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmsView();
  }
  init(films) {
    this._films = films.slice();
    this._renderFilmsSection();
  }

  _renderFilm(film, list) {
    const card = new FilmCardView(film);

    render(list, card);
    card.setShowDetailsClickHandler(this._onFilmCardClick);
  }

  _renderFilms(from, to, listComponent) {
    const list = listComponent.getElement().querySelector(`.films-list__container`);

    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, list));
  }

  _renderFilmsList() {
    render(this._filmsSectionComponent, this._filmsListComponent);

    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP), this._filmsListComponent);

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }
  _renderShowMoreBtn() {
    let renderedFilms = FILMS_COUNT_PER_STEP;

    const showMoreBtnComponent = new ShowMoreBtnView();
    const list = this._filmsListComponent;
    render(list, showMoreBtnComponent);

    const onShowMoreBtnClick = () => {
      this._renderFilms(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP, list);

      renderedFilms += FILMS_COUNT_PER_STEP;
      if (renderedFilms >= this._films.length) {
        remove(showMoreBtnComponent);
      }
    };
    showMoreBtnComponent.setClickHandler(onShowMoreBtnClick);
  }


  _renderExtraLists() {
    render(this._filmsSectionComponent, new FilmsListExtraView(`Top rated`));
    render(this._filmsSectionComponent, new FilmsListExtraView(`Most Commented`));

    const filmsListExtraArr = Array.from(this._filmsSectionComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`));

    filmsListExtraArr.forEach((el) => {
      this._fillFilmsListExtra(el);
    });
  }

  _fillFilmsListExtra(list) {
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      this._renderFilm(this._films[0], list);
    }
  }
  _renderFilmsSection() {
    render(this._mainContainer, this._filmsSectionComponent);

    if (!this._films.length) {
      render(this._filmsSectionComponent, this._noFilmsComponent);
      return;
    }
    this._renderFilmsList(this._filmsSectionComponent);
    this._renderExtraLists(this._filmsSectionComponent);
  }

  _onFilmCardClick(film) {
    const isOpenedDetails = document.querySelector(`.film-details`);
    if (isOpenedDetails) {
      document.body.removeChild(isOpenedDetails);
    }
    const filmDetailsComponent = new FilmDetailsView(film);
    render(document.body, filmDetailsComponent);

    const onFilmDetailsCloseBtnClick = () => {
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onDocKeyDown);
    };
    filmDetailsComponent.setCloseBtnClickHandler(onFilmDetailsCloseBtnClick);

    const onDocKeyDown = (eDown) => {
      if (eDown.key === `Escape` || eDown.key === `Esc`) {
        remove(filmDetailsComponent);
        document.removeEventListener(`keydown`, onDocKeyDown);
      }
    };
    document.addEventListener(`keydown`, onDocKeyDown);
  }

}


