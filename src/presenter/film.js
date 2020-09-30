import FilmCardView from "../view/film-card";
import FilmDetailsPresenter from "../presenter/film-details";
import {render, replace} from "../utils/render";

export default class FilmPresenter {
  constructor(listContainer, changeData) {
    this._listContainer = listContainer;
    this._film = null;
    this._localComment = {};

    this._changeData = changeData;

    this._filmCardComponent = null;
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onControlsClick = this._onControlsClick.bind(this);
    this._handleDetailsChangeData = this._handleDetailsChangeData.bind(this);
  }
  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);
    this._filmCardComponent.setShowDetailsClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setControlsClickHandler(this._onControlsClick);
    if (prevFilmCardComponent === null) {
      render(this._listContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);
  }
  _handleLocalCommentChange(newComment) {
    this._localComment = Object.assign({}, this._localComment, newComment);
  }
  _handleDetailsChangeData(update) {
    this._film = update;
    this._changeData(update);
  }
  _onFilmCardClick() {
    const filmDetailsPresenter = new FilmDetailsPresenter(this._handleDetailsChangeData);
    filmDetailsPresenter.init(this._film, this._localComment);
  }
  _onControlsClick(controlType) {
    // console.log(`from filmPresenter`, controlType);
    this._changeData(Object.assign(
        {},
        this._film,
        {[controlType]: !this._film[controlType]}
    ));
  }

}
