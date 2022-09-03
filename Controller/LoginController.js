import Login from "../teste_codigo/LoginModel.js";
import Valida from "../Validacoes/Normalizacao.js";

class LoginController {
  constructor() {
    const botao = document.querySelector("button");

    const email = document.querySelector("#inputEmail");
    const senha = document.querySelector("#inputPassword");

    this.isFieldsValid = [false, false];
    this.login = new Login();

    email.addEventListener("keyup", (evento) => {
      evento.preventDefault();

      const checaEmail = Valida.isEmailValid(evento.target.value);

      if (checaEmail) this.login.insereEmail(evento.target.value);
      else this.login.insereEmail("");

      this.changeListValidate(checaEmail, 0);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), botao);

      console.log(this.login);
    });

    senha.addEventListener("keyup", (evento) => {
      evento.preventDefault();

      const checaSenha = Valida.isPasswordValid(evento.target.value);

      if (checaSenha) this.login.insereSenha(evento.target.value);
      else this.login.insereSenha("");

      this.changeListValidate(checaSenha, 1);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), botao);

      console.log(this.login);
    });
  }

  changeListValidate(valida, index) {
    if (valida) {
      this.isFieldsValid[index] = true;
    } else {
      this.isFieldsValid[index] = false;
    }
  }

  releaseButton(validate, tagElement) {
    validate
      ? tagElement.removeAttribute("disabled")
      : tagElement.setAttribute("disabled", true);
  }
}

const loginController = new LoginController();
