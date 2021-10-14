const createElement = (tag, classes, id) => {
  let element = document.createElement(tag);

  if (classes && classes.length > 0) {
    classes.forEach((classElement) => {
      element.classList.add(classElement);
    });
  }

  if (id) element.setAttribute("id", id);

  return element;
};

export default createElement;
