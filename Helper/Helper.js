class Helper {
  static listener(elemento) {
    return elemento.addEventListener.bind(elemento);
  }
}

export default Helper;
