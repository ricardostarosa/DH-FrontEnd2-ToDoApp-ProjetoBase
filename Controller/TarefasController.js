import DOM from "../Helper/Helper.js";
import Tarefas from "../Model/TarefasModel.js";
import TarefaView from "../View/TarefaView.js";
import PegaJWT from "../Helper/PegaJWT.js";
import Repository from "../Repo/Repository.js";
import Valida from "../Validacoes/Normalizacao.js";

import { loaderUsuario, renderizarSkeletons } from "../animation/loader.js";

class TarefasController {
  constructor() {
    this.closeApp = DOM.id("closeApp");

    this.nomeUsuario = DOM.selector(".user-info").children[0];

    this.botao = DOM.selector("button");

    this.inputTarefa = DOM.selector("#novaTarefa");

    this.ulTarefasPendentes = DOM.class("tarefas-pendentes")[0].children[0];

    this.form = DOM.selector(".nova-tarefa");

    this.divTarefasTerminadas = DOM.class("tarefas-terminadas")[0];
    this.botaoFinaliza = DOM.selector;

    this.tarefaFinalizada = DOM.class("tarefas-terminadas")[0];

    const self = this;

    this.tarefasModel = new Proxy(new Tarefas(), {
      get(target, props, receiver) {
        if (props === "insereTarefas" && typeof target[props] === "function") {
          return function () {
            Reflect.apply(target[props], target, arguments);

            self.reloadPage(500);
          };
        }

        return Reflect.get(target, props, receiver);
      },
    });

    const usuarioJWT = PegaJWT.getAutorizacaoLogin();

    if (!usuarioJWT) {
      location = "../index.html";
    } else {
      onload = () => {
        this.tamanhoTarefasPendentes(usuarioJWT).then((data) => {
          renderizarSkeletons(data, ".tarefas-pendentes");

          console.log("tarefas", data);
        });

        this.tamanhoTarefasTerminadas(usuarioJWT).then((data) => {
          renderizarSkeletons(data, ".tarefas-terminadas");

          console.log("tarefas", data);
        });

        loaderUsuario(this.nomeUsuario);

        Repository.getUsuario(usuarioJWT)
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            TarefaView.showUserName(data, this.nomeUsuario);
          })
          .catch((e) => {
            console.log(e);
          });

        Repository.pegarTasks(usuarioJWT)
          .then((data) => data.json())
          .then((data) => {
            setTimeout(() => {
              TarefaView.insereTarefaFinalizada(
                this.ordenaTarefa(data),
                this.tarefaFinalizada
              );
              TarefaView.montaTarefa(
                this.ordenaTarefa(data),
                this.ulTarefasPendentes
              );
            }, 1000);
          });
      };
    }

    DOM.listener(this.closeApp)("click", (evento) => {
      PegaJWT.limpaJWT();
      window.location = "../index.html";
    });

    DOM.listener(this.ulTarefasPendentes)("click", (e) => {
      const id = e.target.parentElement.dataset.id;

      const isClicked = e.target.className === "not-done";

      if (isClicked) {
        Repository.pegarTasks(usuarioJWT)
          .then((data) => data.json())
          .then((data) => {
            Repository.atualizaTask(
              id,
              usuarioJWT,
              data.find((item) => item.id === +id)
            );
          });

        Repository.pegarTasks(usuarioJWT)
          .then((data) => data.json())
          .then((data) => {
            this.tarefasModel.insereTarefas(data);
          });
      }
    });

    this.divTarefasTerminadas.addEventListener("click", (e) => {
      const id = e.target.parentElement.dataset.id;

      const isClicked = e.target.className === "not-done";

      if (isClicked) {
        Repository.deletaTask(id, usuarioJWT);

        this.reloadPage(500);
      }
    });

    DOM.listener(this.inputTarefa)("keyup", (evento) => {
      evento.preventDefault();
      const novaTarefa = evento.target;

      // const objValidacao = {
      //   checaTarefa: novaTarefa.value,
      // };

      const validaCampo = Valida.checkTaskLength(novaTarefa.value);

      if (validaCampo) {
        this.botao.disabled = false;
      }
    });

    DOM.listener(this.botao)("click", (evento) => {
      evento.preventDefault();
      const novaTarefa = this.inputTarefa;

      Repository.criarTask(usuarioJWT, novaTarefa.value);

      Repository.pegarTasks(usuarioJWT)
        .then((data) => data.json())
        .then((data) => {
          this.tarefasModel.insereTarefas(data);
        });
    });
  }

  ordenaTarefa(lista) {
    const tarefas = lista || [];
    return tarefas.sort((item1, item2) => item1.id - item2.id);
  }

  reloadPage(tempo = 0) {
    setTimeout(() => {
      location.reload();
    }, tempo);
  }

  async tamanhoTarefasPendentes(jwt) {
    let tarefas = await Repository.pegarTasks(jwt);

    let resultado = await tarefas.json();

    return resultado.filter((item) => !item.completed).length;
  }

  async tamanhoTarefasTerminadas(jwt) {
    let tarefas = await Repository.pegarTasks(jwt);

    let resultado = await tarefas.json();

    return resultado.filter((item) => item.completed).length;
  }
}

const loginController = new TarefasController();
