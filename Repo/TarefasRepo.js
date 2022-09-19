const RECURSOS = {
  task: "https://ctd-todo-api.herokuapp.com/v1/tasks",
};

class TaskRepo {
  //   {
  //   "description": "Aprender Javascript",
  //   "completed": false
  // }

  static pegarTasks(Authorization) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    };

    return fetch(RECURSOS.task, config);
  }

  static criarTask(Authorization, tarefa) {
    const obj = { description: tarefa, completed: false };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },

      body: JSON.stringify(obj),
    };

    return fetch(RECURSOS.task, config);
  }
}

export default TaskRepo;
