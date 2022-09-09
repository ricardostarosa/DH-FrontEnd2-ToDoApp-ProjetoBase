import Valida from "../Validacoes/Normalizacao.js";

class CadastroView {
  constructor() {
    // this.mensagemEmail = document.querySelector("#mensagemEmail");
  }

  mostraMensagemErro(objValidacao, elemento) {
    const listaErro = Valida.mensagemErro(objValidacao);

    listaErro.length
      ? (elemento.textContent = listaErro[0].mensagem)
      : (elemento.textContent = "");
  }
}

export default CadastroView;
