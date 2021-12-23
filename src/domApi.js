const renderText = (text,divReference) => {
  const node = document.querySelector(divReference);
  node.textContent = text;
  return node;
};

const renderImage = (code,divReference) => {
  const node = document.querySelector(divReference);
  node.src = `http://openweathermap.org/img/w/${code}.png`;
  return node;
};
export { renderText, renderImage };
