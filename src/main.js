
import UserProfileView from "./view/user-profile";
import MainNavView from "./view/main-nav";
import SortView from "./view/sort";
import FilmsSectionView from "./view/films-section";
import FilmsListView from "./view/films-list";
import FilmsListExtraView from "./view/films-list-extra";
import FilmCardView from "./view/film-card";
import ShowMoreBtnView from "./view/show-more-btn";
import FooterFilmsCountView from "./view/footer-films-count";
import FilmDetailsView from "./view/film-details";
import NoFilmsView from "./view/no-films";

import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";

import {render} from "./render";

const FILMS_COUNT = 22;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = Array(FILMS_COUNT).fill().map(() => generateFilm());
const filters = generateFilters(films);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterCountElem = document.querySelector(`.footer__statistics`);

render(siteHeaderElem, new UserProfileView(filters.history).getElement());
render(siteFooterCountElem, new FooterFilmsCountView(films.length).getElement());

render(siteMainElem, new MainNavView(filters).getElement());
render(siteMainElem, new SortView().getElement());

const renderFilmsSection = (container) => {
  const filmsSectionComponent = new FilmsSectionView();
  const filmsSection = filmsSectionComponent.getElement();
  render(container, filmsSection);

  if (!films.length) {
    render(filmsSection, new NoFilmsView().getElement());
    return;
  }
  renderFilmsList(filmsSection);
  renderExtraLists(filmsSection);
};

const renderFilmCard = (film, list) => {
  const cardComponent = new FilmCardView(film);
  const card = cardComponent.getElement();

  render(list, card);
  // const card = container.querySelector(`.film-card:last-of-type`);
  const boundOnFilmCardClick = onFilmCardClick.bind(null, film, card);

  cardComponent.getElement().addEventListener(`click`, boundOnFilmCardClick);
};

const renderFilmsList = (container) => {
  const filmsListComponent = new FilmsListView();

  render(container, filmsListComponent.getElement());
  const list = filmsListComponent.getElement().querySelector(`.films-list__container`);

  films
    .slice(0, Math.min(films.length, FILMS_COUNT_PER_STEP))
    .forEach((film) => renderFilmCard(film, list));

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilms = FILMS_COUNT_PER_STEP;

    const showMoreBtnComponent = new ShowMoreBtnView();
    render(filmsListComponent.getElement(), showMoreBtnComponent.getElement());

    showMoreBtnComponent.getElement().addEventListener(`click`, (e) => {
      e.preventDefault();

      films.slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilmCard(film, list));

      renderedFilms += FILMS_COUNT_PER_STEP;
      if (renderedFilms >= films.length) {
        elementRemove(showMoreBtnComponent);
      }
    });
  }

};

const elementRemove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const onFilmCardClick = (film, card, e) => {
  e.preventDefault();
  const target = e.target;
  if (!target.classList.contains(`film-card__title`)
    && !target.classList.contains(`film-card__comments`)
    && !target.classList.contains(`film-card__poster`)) {
    return;
  }
  const isOpenedDetails = document.querySelector(`.film-details`);
  if (isOpenedDetails) {
    document.body.removeChild(isOpenedDetails);
  }
  const filmDetailsComponent = new FilmDetailsView(film);
  render(document.body, filmDetailsComponent.getElement());
  const filmDetailsCloseBtn = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  filmDetailsCloseBtn.addEventListener(`click`, (eClose) => {
    eClose.preventDefault();
    elementRemove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onDocKeyDown);
  });
  const onDocKeyDown = (eDown) => {
    if (eDown.key === `Escape` || eDown.key === `Esc`) {
      elementRemove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onDocKeyDown);
    }
  };
  document.addEventListener(`keydown`, onDocKeyDown);
};

const renderExtraLists = (container) => {
  render(container, new FilmsListExtraView(`Top rated`).getElement());
  render(container, new FilmsListExtraView(`Most Commented`).getElement());

  const filmsListExtraArr = Array.from(container.querySelectorAll(`.films-list--extra .films-list__container`));

  function fillFilmsListExtra(list) {
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderFilmCard(films[0], list);
    }
  }

  filmsListExtraArr.forEach(function (el) {
    fillFilmsListExtra(el);
  });
};

renderFilmsSection(siteMainElem);
