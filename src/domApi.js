const renderText = (text, divReference) => {
  let node;
  if (typeof divReference === 'string') {
    node = document.querySelector(divReference);
  } else {
    node = divReference;
  }
  node.textContent = text;
  return node;
};

const renderImage = (code, divReference) => {
  let node;
  if (typeof divReference === 'string') {
    node = document.querySelector(divReference);
  } else {
    node = divReference;
  }
  node.src = `http://openweathermap.org/img/wn/${code}@2x.PNG`;
  return node;
};
export { renderText, renderImage };
