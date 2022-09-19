const INDEX = "jwt-login";

class PegaJWT {
  static getAutorizacaoLogin() {
    const retorno = JSON.parse(localStorage.getItem(INDEX))[0];
    console.log(retorno);
    return retorno.jwt;
  }
}

export default PegaJWT;
