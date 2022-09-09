import Cadastro from "../Model/CadastroModel.js";
import Valida from "../Validacoes/Normalizacao.js";
import CadastroView from "../View/CadastroWiew.js";
import Helper from "../Helper/Helper.js";

class LoginController {
  constructor() {
    this.input = Helper.selectorAll("input");
    this.botao = Helper.selector("button");

    this.nome = Helper.selector("#nome");
    this.sobrenome = Helper.selector("#sobrenome");
    this.email = Helper.selector("#email");
    this.senha = Helper.selector("#senha");
    this.repetirSenha = Helper.selector("#repetirSenha");

    this.isFieldsValid = [false, false, false, false, false];

    this.cadastro = new Cadastro();
    this.cadastroView = new CadastroView();

    Helper.listener(this.nome)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaNome: evento.target.value,
      };

      this.cadastroView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      this.changeListValidate(Valida.isNameValid(evento.target.value), 0);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), this.botao);

      if (Valida.isNameValid(evento.target.value))
        this.cadastro.insereNome(evento.target.value);
    });

    Helper.listener(this.sobrenome)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaSobrenome: evento.target.value,
      };

      this.cadastroView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      this.changeListValidate(Valida.isSurnameValid(evento.target.value), 1);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), this.botao);

      if (Valida.isSurnameValid(evento.target.value))
        this.cadastro.insereSobrenome(evento.target.value);
    });

    Helper.listener(this.email)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaEmail: evento.target.value,
      };

      this.cadastroView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      this.changeListValidate(Valida.isEmailValid(evento.target.value), 2);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), this.botao);

      if (Valida.isEmailValid(evento.target.value))
        this.cadastro.insereEmail(evento.target.value);
    });

    Helper.listener(this.senha)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaSenha: evento.target.value,
      };

      this.cadastroView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      if (Valida.isPasswordValid(evento.target.value))
        this.cadastro.insereSenha(evento.target.value);

      this.changeListValidate(Valida.isPasswordValid(evento.target.value), 3);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), this.botao);

      if (Valida.isPasswordValid(evento.target.value))
        this.cadastro.insereSenha(evento.target.value);
    });

    Helper.listener(this.repetirSenha)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaRepetirSenha: {
          data1: this.cadastro.lista.senha,
          data2: evento.target.value,
        },
      };

      this.cadastroView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      this.changeListValidate(
        Valida.isDataSame({
          data1: this.cadastro.lista.senha,
          data2: evento.target.value,
        }),
        4
      );

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), this.botao);

      if (
        Valida.isDataSame({
          data1: this.cadastro.lista.senha,
          data2: evento.target.value,
        })
      )
        this.cadastro.insereRepetirSenha(evento.target.value);
    });

    Helper.listener(this.botao)("click", (evento) => {
      evento.preventDefault();

      console.log("clicou");

      console.log(this.cadastro.lista);
    });
  }

  changeListValidate(valida, index) {
    this.isFieldsValid[index] = valida;
  }

  releaseButton(validate, tagElement) {
    validate
      ? tagElement.removeAttribute("disabled")
      : tagElement.setAttribute("disabled", true);
  }
}

const loginController = new LoginController();
