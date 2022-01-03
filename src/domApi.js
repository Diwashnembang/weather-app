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
  node.src = `https://openweathermap.org/img/wn/${code}@2x.png`;
  return node;
};

const hideDiv = (refernece) => {
  const div = document.querySelector(refernece);
  div.classList.add('hidden');
};
const unhideDiv = (refernece) => {
  const div = document.querySelector(refernece);
  div.classList.remove('hidden');
};
export {
  renderText, renderImage, hideDiv, unhideDiv,
};
