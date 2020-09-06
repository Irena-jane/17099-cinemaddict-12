import {createElement} from "../utils/render";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Abstract class not implemented, only concrete one`);
    }
    this._element = null;
    this._callback = {};
  }
  getTemplate() {
    throw new Error(`Abstract class not implemented: ${this.getTemplate.name}`);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
