import Abstract from "./abstract";

const createFilmsSectionTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};
export default class FilmsSection extends Abstract {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}

