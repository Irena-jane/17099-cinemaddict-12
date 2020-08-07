import {ESC_KEYCODE} from "./const";

import {createUserProfileTemplate} from "./view/user-profile";
import {createMainNavTemplate} from "./view/main-nav";
import {createSortTemplate} from "./view/sort";
import {createFilmsSectionTemplate} from "./view/films-section";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsListExtraTemplate} from "./view/films-list-extra";
import {createFilmCardTemplate} from "./view/film-card";
import {createShowMoreBtnTemplate} from "./view/show-more-btn";
import {createFooterFilmsCountTemplate} from "./view/footer-films-count";

import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";

import {render} from "./render";
import {createFilmDetails} from "./view/film-details";

const FILMS_COUNT = 22;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = Array(FILMS_COUNT).fill().map(() => generateFilm());
const filters = generateFilters(films);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterCountElem = document.querySelector(`.footer__statistics`);

render(siteHeaderElem, createUserProfileTemplate(filters.history));

render(siteMainElem, createMainNavTemplate(filters));
render(siteMainElem, createSortTemplate());
render(siteMainElem, createFilmsSectionTemplate());

render(siteFooterCountElem, createFooterFilmsCountTemplate(films.length));

const filmsSection = siteMainElem.querySelector(`.films`);
render(filmsSection, createFilmsListTemplate());
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

const onFilmCardClick = (film, card, e) => {
  e.preventDefault();
  const target = e.target;
  if (!target.classList.contains(`film-card__title`)
    && !target.classList.contains(`film-card__comments`)
    && !target.classList.contains(`film-card__poster`)) {
    return;
  }
  render(document.body, createFilmDetails(film));
  const filmDetails = document.querySelector(`.film-details`);
  const filmDetailsCloseBtn = filmDetails.querySelector(`.film-details__close-btn`);
  card.removeEventListener(`click`, onFilmCardClick);

  filmDetailsCloseBtn.addEventListener(`click`, (eClose) => {
    eClose.preventDefault();
    filmDetails.remove();
  });
  const onDocKeyDown = (eDown) => {
    if (eDown.keyCode === ESC_KEYCODE) {
      filmDetails.remove();
      document.removeEventListener(`keydown`, onDocKeyDown);
    }
  };
  document.addEventListener(`keydown`, onDocKeyDown);
};

const animateFilmCard = (film, container = filmsListContainer) => {
  render(container, createFilmCardTemplate(film));
  const card = container.querySelector(`.film-card:last-of-type`);
  const boundOnFilmCardClick = onFilmCardClick.bind(null, film, card);

  card.addEventListener(`click`, boundOnFilmCardClick);
};

for (let i = 0; i < Math.min(FILMS_COUNT, FILMS_COUNT_PER_STEP); i++) {
  animateFilmCard(films[i]);
}


if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilms = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreBtnTemplate());
  const showMoreBtn = filmsList.querySelector(`.films-list__show-more`);

  showMoreBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    films.slice(renderedFilms, renderedFilms + FILMS_COUNT_PER_STEP)
      .forEach((film) => {
        animateFilmCard(film);
      });
    renderedFilms += FILMS_COUNT_PER_STEP;
    if (renderedFilms >= films.length) {
      showMoreBtn.remove();
    }
  });
}

render(filmsSection, createFilmsListExtraTemplate(`Top rated`));
render(filmsSection, createFilmsListExtraTemplate(`Most Commented`));

const filmsListExtraArr = Array.from(filmsSection.querySelectorAll(`.films-list--extra .films-list__container`));

function fillFilmsListExtra(list) {
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    animateFilmCard(films[0], list);
  }
}

filmsListExtraArr.forEach(function (el) {
  fillFilmsListExtra(el);
});
