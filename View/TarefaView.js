import FormataDados from "../Helper/FormataDados.js";

class TarefaView {
  static montaTarefa(lista, elemento) {
    let tarefas = "";

    lista
      .filter((item) => !item.completed)
      .forEach((item) => {
        tarefas += `<li class="tarefa" data-id="${item.id}">
           <div class="not-done"></div>
           <div class="descricao">
             <p class="nome">${item.description}</p>
             <p class="timestamp">Criada em: ${FormataDados.data(
               item.createdAt
             )}</p>
           </div>
           <div>
            </div>
          </li>`;
      });

    elemento.innerHTML = tarefas;
  }

  static showUserName({ firstName }, elemento) {
    elemento.textContent = `Oi, ${firstName}!`;
  }

  static insereTarefaFinalizada(lista, elemento) {
    let tarefas = "";

    lista
      .filter((item) => item.completed)
      .forEach((item) => {
        tarefas += `<li class="tarefa" data-id="${item.id}">
           <div class="not-done"></div>
           <div class="descricao">
             <p class="nome">${item.description}</p>
             <p class="timestamp">Criada em: ${FormataDados.data(
               item.createdAt
             )}</p>
           </div>
           <div>
            </div>
          </li>`;
      });

    elemento.innerHTML = tarefas;
  }

  static mostraMensagemErro(objValidacao, elemento) {
    const listaErro = Valida.mensagemErro(objValidacao);

    listaErro.length
      ? (elemento.textContent = listaErro[0].mensagem)
      : (elemento.textContent = "");
  }
}

export default TarefaView;
