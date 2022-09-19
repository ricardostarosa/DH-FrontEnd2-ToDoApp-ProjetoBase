const KEY_JWT = "jwt-login";

class SaveStorageLogin {
  static isStorageEmpty(key) {
    return localStorage.getItem(key);
  }

  static isElementInStorage(lista, email) {
    return lista.indexOf(lista.find((item) => item.email === email));
  }

  static saveLocal(dado, email) {
    const isEmpty = JSON.parse(this.isStorageEmpty(KEY_JWT)) || [];
    const OBJETO_JWT = { email, jwt: dado.jwt };

    if (!isEmpty.length) {
      isEmpty[0] = OBJETO_JWT;

      const propriedade = JSON.stringify(isEmpty);

      localStorage.setItem(KEY_JWT, propriedade);
    } else {
      const elementoIndice = this.isElementInStorage(isEmpty, email);

      if (elementoIndice === -1 || elementoIndice === undefined) {
        isEmpty[0] = OBJETO_JWT;

        const propriedade = JSON.stringify(isEmpty);

        localStorage.setItem(KEY_JWT, propriedade);
      } else {
        isEmpty[elementoIndice].jwt = dado.jwt;

        const propriedade = JSON.stringify(isEmpty);

        localStorage.setItem(KEY_JWT, propriedade);
      }
    }
  }
}

export default SaveStorageLogin;
