
import MainNavView from "../view/main-nav";
import SortView from "../view/sort";
import FilmsSectionView from "../view/films-section";
import FilmsListView from "../view/films-list";
import FilmsListExtraView from "../view/films-list-extra";
import ShowMoreBtnView from "../view/show-more-btn";
import NoFilmsView from "../view/no-films";

import FilmCardPresenter from "./film";

import {render, remove, RenderPosition} from "../utils/render";
import {sortDateDown, sortRatingDown, sortCommentsDown, updateItem} from "../utils/common";
import {SortType} from "../const";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

export default class MovieList {
  constructor(mainContainer, filters) {
    this._mainContainer = mainContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._filmPresenter = {};

    this._filters = filters;
    this._currentSortType = SortType.DEFAULT;

    this._navComponent = new MainNavView(this._filters);
    this._sortComponent = new SortView();
    this._filmsSectionComponent = new FilmsSectionView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsListComponent = null;
    this._topRated = null;
    this._mostCommented = null;
    this._filmDetails = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }
  init(films) {
    this._films = films.slice();
    this._sourceFilms = films.slice();

    this._renderNav();
    this._renderSort();
    render(this._mainContainer, this._filmsSectionComponent);
    this._renderFilmsSection();
  }

  _renderFilmsSection() {
    if (!this._films.length) {
      render(this._filmsSectionComponent, this._noFilmsComponent);
      return;
    }
    this._renderFilmsList(this._filmsSectionComponent);
    this._renderTopRated();
    this._renderMostCommented();
  }
  _handleFilmChange(updatedFilm) {
    console.log(updatedFilm);
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmsSection();
    this._renderFilmsSection();

  }
  _clearFilmsSection() {
    this._filmsSectionComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
  }
  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._films = this._sourceFilms.slice();
        break;
      case SortType.DATE:
        this._films.sort(sortDateDown);
        break;
      case SortType.RATING:
        this._films.sort(sortRatingDown);
        break;
    }
    this._currentSortType = SortType;
  }
  _renderSort() {
    render(this._mainContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
  _renderFilm(film, list) {
    const filmPresenter = new FilmCardPresenter(list, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films, listComponent) {
    const list = listComponent.getElement().querySelector(`.films-list__container`);

    films
      .forEach((film) => this._renderFilm(film, list));
  }

  _renderFilmsList() {
    this._filmsListComponent = new FilmsListView();
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);

    const films = this._films.slice(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    this._renderFilms(films, this._filmsListComponent);

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }
  _renderShowMoreBtn() {
    const showMoreBtnComponent = new ShowMoreBtnView();
    const list = this._filmsListComponent;
    render(list, showMoreBtnComponent);

    const onShowMoreBtnClick = () => {
      const films = this._films.slice(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
      this._renderFilms(films, list);

      this._renderedFilmsCount += FILMS_COUNT_PER_STEP;
      if (this._renderedFilmsCount >= this._films.length) {
        remove(showMoreBtnComponent);
      }
    };
    showMoreBtnComponent.setClickHandler(onShowMoreBtnClick);
  }
  _renderTopRated() {
    this._topRated = new FilmsListExtraView(`Top rated`);
    render(this._filmsSectionComponent, this._topRated);
    const films = this._films.slice().sort(sortRatingDown).slice(0, FILMS_EXTRA_COUNT);
    this._renderFilms(films, this._topRated);
  }
  _renderMostCommented() {
    this._mostCommented = new FilmsListExtraView(`Most Commented`);
    render(this._filmsSectionComponent, this._mostCommented);
    const films = this._films.slice().sort(sortCommentsDown).slice(0, FILMS_EXTRA_COUNT);
    this._renderFilms(films, this._mostCommented);
  }
  _renderNav() {
    render(this._mainContainer, this._navComponent);
  }

}


