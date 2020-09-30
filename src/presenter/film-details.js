import FilmDetailsView from "../view/film-details";
import {render, remove} from "../utils/render";

export default class FilmDetailsPresenter {
  constructor(changeData) {
    this._film = null;
    this._filmDetailsComponent = null;
    this._newCommentComponent = null;
    this._localComment = {};

    this._changeData = changeData;

    this._onDocKeyDown = this._onDocKeyDown.bind(this);
    this._onFilmDetailsCloseBtnClick = this._onFilmDetailsCloseBtnClick.bind(this);
    this._onControlsChange = this._onControlsChange.bind(this);
  }
  init(film, localComment) {
    this._film = film;
    this._localComment = localComment;

    if (this._filmDetailsComponent !== null) {
      remove(this._filmDetailsComponent);
    }
    this._filmDetailsComponent = new FilmDetailsView(this._film, this._localComment);
    render(document.body, this._filmDetailsComponent);

    this._filmDetailsComponent.setCloseBtnClickHandler(this._onFilmDetailsCloseBtnClick);
    this._filmDetailsComponent.setControlsChangeHandler(this._onControlsChange);
    document.addEventListener(`keydown`, this._onDocKeyDown);
  }
  _changeFilmData(controlType) {
    this._film = Object.assign(
        {},
        this._film,
        {
          [controlType]: !this._film[controlType]
        }
    );
  }
  _onControlsChange(controlType) {
    console.log(controlType);
    this._changeFilmData(controlType);
    this._changeData(this._film);
  }
  _onDocKeyDown(e) {
    if (e.key === `Escape` || e.key === `Esc`) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onDocKeyDown);
    }
  }
  _onFilmDetailsCloseBtnClick() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onDocKeyDown);
  }
}
