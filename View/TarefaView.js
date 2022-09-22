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

    console.log("TAREFA VIEW", tarefas);

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

    console.log("TAREFA VIEW TERMINADAS", tarefas);

    elemento.innerHTML = tarefas;
  }
}

export default TarefaView;
