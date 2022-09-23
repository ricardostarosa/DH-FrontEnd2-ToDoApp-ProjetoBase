import DOM from "../Helper/Helper.js";
import Tarefas from "../Model/TarefasModel.js";
import TarefaView from "../View/TarefaView.js";
import PegaJWT from "../Helper/PegaJWT.js";
import Repository from "../Repo/Repository.js";

class TarefasController {
  constructor() {
    this.closeApp = DOM.id("closeApp");

    this.nomeUsuario = DOM.selector(".user-info").children[0];

    this.botao = DOM.selector("button").children[0];

    this.inputTarefa = DOM.selector("#novaTarefa");

    this.ulTarefasPendentes = DOM.class("tarefas-pendentes")[0].children[0];

    this.form = DOM.selector(".nova-tarefa");

    this.divTarefasTerminadas = DOM.class("tarefas-terminadas")[0];
    this.botaoFinaliza = DOM.selector;

    this.tarefaFinalizada = DOM.class("tarefas-terminadas")[0];

    this.tarefasModel = new Proxy(new Tarefas(), {
      get(target, props, receiver) {
        console.log("intercepta tarefas", target[props]);

        if (props === "insereTarefas" && typeof target[props] === "function") {
          return function () {
            console.log(props);

            Reflect.apply(target[props], target, arguments);

            console.log("intercepta insereTarefas", target[props]);
          };
        }

        return Reflect.get(target, props, receiver);
      },
    });

    const usuarioJWT = PegaJWT.getAutorizacaoLogin();

    window.onload = () => {
      if (!usuarioJWT) location = "../index.html";
      else {
        Repository.pegarTasks(usuarioJWT)
          .then((data) => data.json())
          .then((data) => {
            console.log("pega tarefa", data);

            this.tarefasModel.insereTarefas(data);
            TarefaView.montaTarefa(
              this.ordenaTarefa(this.tarefasModel.tarefas),
              this.ulTarefasPendentes
            );

            TarefaView.insereTarefaFinalizada(
              this.ordenaTarefa(this.tarefasModel.tarefas),
              this.tarefaFinalizada
            );
          });
      }
    };

    DOM.listener(this.closeApp)("click", (evento) => {
      PegaJWT.limpaJWT();
      window.location = "../index.html";
    });

    this.ulTarefasPendentes.addEventListener("click", (e) => {
      const id = e.target.parentElement.dataset.id;

      const isClicked = e.target.className === "not-done";

      const itemAtualiza = this.tarefasModel.tarefas.find(
        (item) => item.id === +id
      );

      Repository.atualizaTask(id, usuarioJWT, itemAtualiza);

      if (isClicked) {
        console.log(e.target.parentElement);

        // implementar o repositorio atualiza aqui

        Repository.pegarTasks(usuarioJWT)
          .then((data) => data.json())
          .then((data) => {
            console.log("pega tarefa", data);
            console.log("tarefa dom", this.tarefaFinalizada);

            console.log("atualiza", itemAtualiza);
            this.tarefasModel.insereTarefas(data);

            TarefaView.insereTarefaFinalizada(
              this.ordenaTarefa(this.tarefasModel.tarefas),
              this.tarefaFinalizada
            );

            location.reload(true);
          });
      }
    });

    this.divTarefasTerminadas.addEventListener("click", (e) => {
      const id = e.target.parentElement.dataset.id;

      const isClicked = e.target.className === "not-done";

      if (isClicked) {
        console.log(e.target.parentElement);

        console.log(id);

        Repository.deletaTask(id, usuarioJWT);

        location.reload(true);
      }
    });

    Repository.getUsuario(usuarioJWT)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        TarefaView.showUserName(data, this.nomeUsuario);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    DOM.listener(this.botao)("click", (evento) => {
      const novaTarefa = this.inputTarefa;

      Repository.criarTask(usuarioJWT, novaTarefa.value)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });

      Repository.pegarTasks(usuarioJWT)
        .then((data) => data.json())
        .then((data) => {
          this.tarefasModel.insereTarefas(data);
          TarefaView.montaTarefa(
            this.tarefasModel.tarefas,
            this.ulTarefasPendentes
          );
          console.log("pega tarefa", this.tarefasModel.tarefas);
        });
    });
  }

  ordenaTarefa(lista) {
    const tarefas = lista || [];
    return tarefas.sort((item1, item2) => item1.id - item2.id);
  }

  finalizaTarefa(id) {
    // lista
    //   .filter((item) => !item.completed)
    //   .forEach((item) => {
    //     tarefas += `<li class="tarefa" data-id="${item.id}">
    //        <div class="not-done"></div>
    //        <div class="descricao">
    //          <p class="nome">${item.description}</p>
    //          <p class="timestamp">Criada em: ${FormataDados.data(
    //            item.createdAt
    //          )}</p>
    //        </div>
    //        <div>
    //         </div>
    //       </li>`;
    //   });
    document
      .querySelector(".tarefas-terminadas")
      .appendChild(document.querySelector(`[data-id="${id}"]`));
  }
}

const loginController = new TarefasController();
