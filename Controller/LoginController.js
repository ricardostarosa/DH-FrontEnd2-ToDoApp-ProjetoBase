import Login from "../Model/LoginModel.js";
import Valida from "../Validacoes/Normalizacao.js";
import LoginView from "../View/LoginView.js";
import Helper from "../Helper/Helper.js";

class LoginController {
  constructor() {
    const botao = document.querySelector("button");

    const email = document.querySelector("#inputEmail");

    const senha = document.querySelector("#inputPassword");

    this.isFieldsValid = [false, false];

    this.login = new Login();
    this.loginView = new LoginView();

    Helper.listener(email)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaEmail: evento.target.value,
      };

      this.loginView.mostraMensagemErro(
        objValidacao,
        evento.target.nextSibling
      );

      this.changeListValidate(Valida.isEmailValid(evento.target.value), 0);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), botao);

      console.log(this.isFieldsValid);
    });

    Helper.listener(senha)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaSenha: evento.target.value,
      };

      this.loginView.mostraMensagemErro(
        objValidacao,
        evento.target.nextSibling
      );

      this.changeListValidate(Valida.isPasswordValid(evento.target.value), 1);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), botao);

      console.log(this.isFieldsValid);
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
