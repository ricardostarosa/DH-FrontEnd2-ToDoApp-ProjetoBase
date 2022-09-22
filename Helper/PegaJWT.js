const INDEX = "jwt-login";

class PegaJWT {
  static getAutorizacaoLogin() {
    const retorno = JSON.parse(localStorage.getItem(INDEX)) || [];
    console.log(retorno);
    return retorno[0]?.jwt;
  }

  static limpaJWT() {
    localStorage.removeItem(INDEX);
  }
}

export default PegaJWT;
