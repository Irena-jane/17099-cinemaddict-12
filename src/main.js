import {createUserProfileTemplate} from "./view/user-profile";
import {createMainNavTemplate} from "./view/main-nav";
import {createSortTemplate} from "./view/sort";
import {createFilmsSectionTemplate} from "./view/films-section";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsListExtraTemplate} from "./view/films-list-extra";
import {createFilmCardTemplate} from "./view/film-card";
import {createShowMoreBtnTemplate} from "./view/show-more-btn";
import {createFooterFilmsCountTemplate} from "./view/footer-films-count";

import {render} from "./render";

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterElem = document.querySelector(`.footer`);

render(siteHeaderElem, createUserProfileTemplate());

render(siteMainElem, createMainNavTemplate());
render(siteMainElem, createSortTemplate());
render(siteMainElem, createFilmsSectionTemplate());

render(siteFooterElem, createFooterFilmsCountTemplate());

const filmsSection = siteMainElem.querySelector(`.films`);
render(filmsSection, createFilmsListTemplate());
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate());
}
render(filmsList, createShowMoreBtnTemplate());

render(filmsSection, createFilmsListExtraTemplate(`Top rated`));
render(filmsSection, createFilmsListExtraTemplate(`Most Commented`));

const filmsListExtraArr = Array.from(filmsSection.querySelectorAll(`.films-list--extra .films-list__container`));

function fillFilmsListExtra(list) {
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(list, createFilmCardTemplate());
  }
}

filmsListExtraArr.forEach(function (el) {
  fillFilmsListExtra(el);
});
