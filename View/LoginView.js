import Valida from "../Validacoes/Normalizacao.js";

class LoginView {
  constructor() {
    // this.mensagemEmail = document.querySelector("#mensagemEmail");
  }

  mostraMensagemErro(objValidacao, elemento) {
    const listaErro = Valida.mensagemErro(objValidacao);
    const { mensagem } = listaErro[0];

    listaErro.length
      ? (elemento.textContent = mensagem)
      : (elemento.textContent = "");
  }
}

export default LoginView;
