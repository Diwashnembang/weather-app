const ui = (() => {
  const addDiv = (parent) => {
    const div = document.createElement('div');
    parent.appendChild(parent);
    return div;
  };

  return { addDiv };
})();

export default ui;
