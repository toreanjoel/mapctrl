function renderDomElm(parent, tag, child, options = {}) {
  const parentElm = document.querySelector(parent)
  const createElm = document.createElement(tag);
  const childStringCheck = typeof child === 'string';
  let childData;

  // set attribute if needed
  if (options || Object.keys(options).length === 0) {
    Object.keys(options).forEach(option => {
      createElm.setAttribute(option, options[option]);
    })
  }

  // create string node for child
  if (childStringCheck) {
    childData = document.createTextNode(child);
  } else {
    // use child as it can be nested with dom elements
    childData = child;
  }

  // add child data to tag
  createElm.appendChild(childData)
  // add child data to parent
  parentElm.appendChild(createElm);
  return parent
}

/**
 * sorts the keys in the array
 * @param {object} obj object to sort
 */
function sortKeys(obj) {
  const keys = Object.keys(obj);
  keys.sort().reverse();

  // or array of sorted object
  return keys.map((v) => {
    return {id: v, ...obj[v]}
  })
}