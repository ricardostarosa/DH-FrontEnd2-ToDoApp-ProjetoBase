class DOM {
  static listener(elemento) {
    return elemento.addEventListener.bind(elemento);
  }

  static get selector() {
    return document.querySelector.bind(document);
  }

  static get selectorAll() {
    return document.querySelectorAll.bind(document);
  }

  static get id() {
    return document.getElementById.bind(document);
  }

  static get class() {
    return document.getElementsByClassName.bind(document);
  }
}

export default DOM;
