import FormataDados from "../Helper/FormataDados.js";

class TarefaView {
  static montaTarefa(lista, elemento) {
    let tarefas = "";

    lista.forEach((item) => {
      tarefas += `<li class="tarefa">
           <div class="not-done"></div>
           <div class="descricao">
             <p class="nome">${item.description}</p>
             <p class="timestamp">Criada em: ${FormataDados.data(
               item.createdAt
             )}</p>
           </div>
         </li>`;
    });

    console.log("TAREFA VIEW", tarefas);

    elemento.innerHTML = tarefas;
  }

  static showUserName({ firstName }, elemento) {
    elemento.textContent = `Oi, ${firstName}!`;
  }
}

export default TarefaView;
