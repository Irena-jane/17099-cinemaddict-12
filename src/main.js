
import UserProfileView from "./view/user-profile";
import FooterFilmsCountView from "./view/footer-films-count";
import Api from "./api";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms().then((movies) => {
  console.log(movies);
});

import MovieListPresenter from "./presenter/movie-list";

import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";

import {render} from "./utils/render";

const FILMS_COUNT = 22;

const films = Array(FILMS_COUNT).fill().map(() => generateFilm());
const filters = generateFilters(films);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterCountElem = document.querySelector(`.footer__statistics`);

render(siteHeaderElem, new UserProfileView(filters.history));
render(siteFooterCountElem, new FooterFilmsCountView(films.length));

const movieListPresenter = new MovieListPresenter(siteMainElem, filters);
movieListPresenter.init(films);
