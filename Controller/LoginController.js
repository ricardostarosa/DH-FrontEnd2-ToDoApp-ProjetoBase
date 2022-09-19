import Login from "../Model/LoginModel.js";
import Valida from "../Validacoes/Normalizacao.js";
import LoginView from "../View/LoginView.js";
import Helper from "../Helper/Helper.js";
import LoginRepo from "../Repo/LoginRepo.js";
import DOM from "../Helper/Helper.js";
import SaveStorageLogin from "../Helper/StorageLogin.js";

const MENSAGEM_ERRO = "Email ou senha incorretos!";

const MENSAGEM_ERRO_SERVIDOR = "Erro servidor!";

const objErros = {
  400: "Email ou senha incorretos!",
  404: "Faça o seu cadastro para poder logar!",
  500: "Erro servidor!",
};

class LoginController {
  constructor() {
    const botao = Helper.selector("button");

    const form = Helper.selector("form");

    const email = Helper.selector("#inputEmail");

    const senha = Helper.selector("#inputPassword");

    this.isFieldsValid = [false, false];

    this.login = new Login();
    this.loginView = new LoginView();

    DOM.listener(form)("click", (evento) => {
      DOM.selector(".right").children[0].textContent = "";
    });

    Helper.listener(botao)("click", (evento) => {
      evento.preventDefault();

      const elementos = evento.target.parentNode.elements;

      this.login.insereEmail(elementos.inputEmail.value);

      this.login.insereSenha(elementos.inputPassword.value);

      const dadosLogin = {
        email: this.login.email,
        password: this.login.senha,
      };

      LoginRepo.loginUsuario(dadosLogin)
        .then((data) => {
          if (data.status === 200 || data.status === 201) return data.json();
          else throw new Error(objErros[data.status]);
        })
        .then((data) => {
          this.sucesso(data, dadosLogin.email);
          console.log(data);
        })
        .catch((e) => {
          this.erro(e.message);

          console.log("erro", e.message);
        });
    });

    Helper.listener(email)("keyup", (evento) => {
      evento.preventDefault();

      const objValidacao = {
        checaEmail: evento.target.value,
      };

      this.loginView.mostraMensagemErro(
        objValidacao,
        evento.target.nextElementSibling
      );

      this.changeListValidate(Valida.isEmailValid(evento.target.value), 0);

      this.releaseButton(Valida.isButtonLock(this.isFieldsValid), botao);

      console.log(this.login);
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

  sucesso(obj, email) {
    SaveStorageLogin.saveLocal(obj, email);

    location = "../tarefas.html";
  }

  erro(mensagem) {
    DOM.selector(".right").children[0].textContent = mensagem;
  }
}

const loginController = new LoginController();
