import DOM from "../Helper/Helper.js";
import UsuarioRepo from "../Repo/GetUsuarioRepo.js";
import TaskRepo from "../Repo/TarefasRepo.js";
import TarefaView from "../View/TarefaView.js";
import PegaJWT from "../Helper/PegaJWT.js";

class TarefasController {
  constructor() {
    this.nomeUsuario = DOM.selector(".user-info").children[0];

    this.ul = DOM.selector(".tarefas-pendentes").children[0];

    this.form = DOM.selector(".nova-tarefa");

    const usuarioJWT = PegaJWT.getAutorizacaoLogin();

    UsuarioRepo.getUsuario(usuarioJWT)
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

    TaskRepo.pegarTasks(usuarioJWT)
      .then((data) => data.json())
      .then((data) => {
        TarefaView.montaTarefa(data, this.ul);
        console.log(data);
      });

    console.log("formulario", this.form);

    DOM.listener(this.form)("submit", (evento) => {
      evento.preventDefault();

      const { novaTarefa } = evento.target.elements;

      TaskRepo.criarTask(usuarioJWT, novaTarefa.value)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });

      TaskRepo.pegarTasks(usuarioJWT)
        .then((data) => data.json())
        .then((data) => {
          TarefaView.montaTarefa(data, this.ul);
          console.log(data);
        });
    });
  }
}

const loginController = new TarefasController();
