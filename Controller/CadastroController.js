import Cadastro from "../Model/CadastroModel.js";
import Valida from "../Validacoes/Normalizacao.js";
import CadastroView from "../View/CadastroWiew.js";
import DOM from "../Helper/Helper.js";
import CadastroRepo from "../Repo/CadastroRepo.js";
import StorageCadastro from "../Helper/StorageCadastro.js";

import { loader, unLoader } from "../animation/loader.js";

class cadastroController {
  constructor() {
    this.input = DOM.selectorAll("input");
    this.botao = DOM.selector("button");

    this.form = DOM.selector("form");

    this.nome = DOM.selector("#nome");
    this.sobrenome = DOM.selector("#sobrenome");
    this.email = DOM.selector("#email");
    this.senha = DOM.selector("#senha");
    this.repetirSenha = DOM.selector("#repetirSenha");

    this.isFieldsValid = [false, false, false, false, false];

    this.cadastro = new Cadastro();
    this.cadastroView = new CadastroView();

    DOM.listener(this.nome)("keyup", (evento) => {
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

    DOM.listener(this.sobrenome)("keyup", (evento) => {
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

    DOM.listener(this.email)("keyup", (evento) => {
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

    DOM.listener(this.senha)("keyup", (evento) => {
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

    DOM.listener(this.repetirSenha)("keyup", (evento) => {
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

    DOM.listener(this.form)("click", (evento) => {
      DOM.selector(".right").children[0].textContent = "";
    });

    DOM.listener(this.botao)("click", (evento) => {
      evento.preventDefault();
      evento.stopPropagation();

      const elementos = evento.target.parentNode.elements;

      const dadosUsuario = {
        firstName: elementos.nome.value,
        lastName: elementos.sobrenome.value,
        email: elementos.email.value,
        password: elementos.senha.value,
      };

      loader(this.botao);

      CadastroRepo.criarUsuario(dadosUsuario)
        .then((data) => {
          if (data.status === 400) {
            throw new Error("Usuário já existe na base de dados!");
          } else if (data.status === 500) {
            throw new Error("Erro no servidor");
          }

          return data.json();
        })
        .then((data) => {
          StorageCadastro.saveLocal(data, dadosUsuario.email);

          setTimeout(() => {
            location = "../index.html";
          }, 2000);

          console.log(data);
        })
        .catch((e) => {
          DOM.selector(".right").children[0].textContent = e.message;

          unLoader(this.botao);
          this.email.focus();
          console.log("erro", e.message);
        });
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

const loginController = new cadastroController();
