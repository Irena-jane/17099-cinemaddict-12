import Smart from "./smart";

const createNewCommentTemplate = (newComment) => {
  const {emoji, description} = newComment;

  return `<div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
          ${emoji.length > 0 ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${description.length > 0 ? description : ``}</textarea>
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
        </div>`;
};
export default class NewComment extends Smart {
  constructor(data) {
    super();
    this._data = data;

    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this.setEmojiChangeHandler = this.setEmojiChangeHandler.bind(this);
  }
  getTemplate() {
    return createNewCommentTemplate(this._data);
  }
  _emojiChangeHandler(e) {
    e.preventDefault();
    this._callback.emojiChange(e.target.value);
  }
  setEmojiChangeHandler(callback) {
    this._callback.emojiChange = callback;
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
  }
  restoreHandlers() {
    this.setEmojiChangeHandler(this._callback.emojiChange);
  }
}
