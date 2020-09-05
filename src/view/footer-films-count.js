import Abstract from "./abstract";

const createFooterFilmsCountTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class FooterFilmsCount extends Abstract {
  constructor(count) {
    super();
    this._count = count;
  }
  getTemplate() {
    return createFooterFilmsCountTemplate(this._count);
  }
}
