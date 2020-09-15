import Abstract from "../view/abstract";

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();
  return newElement.firstChild;
};

export const render = (container, element, position = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, position = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  container.insertAdjacentHTML(position, template);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, component) => {
  if (component instanceof Abstract) {
    component = component.getElement();
  }
  if (newComponent instanceof Abstract) {
    newComponent = newComponent.getElement();
  }
  const parent = component.parentElement;
  if (parent === null || newComponent === null || component === null) {
    throw new Error(`Can't replace unexisting element!`);
  }
  parent.replaceChild(newComponent, component);

};
