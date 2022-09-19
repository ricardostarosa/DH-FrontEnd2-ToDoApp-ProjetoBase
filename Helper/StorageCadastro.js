const KEY_JWT = "jwt-cadastro";

class SaveStorageCadastro {
  static isStorageEmpty(key) {
    return localStorage.getItem(key);
  }

  static saveLocal(dado, email) {
    const isEmpty = JSON.parse(this.isStorageEmpty(KEY_JWT)) || [];

    isEmpty.push({ email, jwt: dado.jwt });

    const propriedade = JSON.stringify(isEmpty);

    localStorage.setItem(KEY_JWT, propriedade);
  }
}

export default SaveStorageCadastro;
