const BASE_URL = "https://ctd-fe2-todo-v2.herokuapp.com/v1";

const RECURSOS = {
  users: `${BASE_URL}/users`,
  singleUser: `${BASE_URL}/users/getMe`,
  login: `${BASE_URL}/users/login`,
  tasks: `${BASE_URL}/tasks`,
  tasksAtualiza: `${BASE_URL}/tasks/`,
  tasksDeleta: `${BASE_URL}/tasks/`,
};

const Repo = () => {
  const configs = {
    post: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },

    get: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },

    put: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },

    delete: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };

  function criarUsuario({ firstName, lastName, email, password }) {
    const obj = { firstName, lastName, email, password };

    return fetch(
      RECURSOS.users,
      ({ ...configs.post }.body = JSON.stringify(obj))
    );
  }

  function getUsuario(Authorization) {
    const config = { ...configs.get };

    config.headers.Authorization = Authorization;

    return fetch(RECURSOS.singleUser, config);
  }

  function loginUsuario({ email, password }) {
    const obj = { email, password };

    return fetch(
      RECURSOS.login,
      ({ ...configs.post }.body = JSON.stringify(obj))
    );
  }

  function pegarTasks(Authorization) {
    const config = { ...configs.get };

    config.headers.Authorization = Authorization;

    return fetch(RECURSOS.tasks, config);
  }

  function criarTask(Authorization, tarefa) {
    const obj = { description: tarefa, completed: false };
    const config = { ...configs.post };

    config.headers.Authorization = Authorization;
    config.body = JSON.stringify(obj);

    return fetch(RECURSOS.tasks, config);
  }

  function atualizaTask(id, Authorization, { description }) {
    const obj = { description, completed: true };

    const config = { ...configs.put };

    config.headers.Authorization = Authorization;
    config.body = JSON.stringify(obj);

    function insereId(id) {
      return this.tasksAtualiza + id;
    }

    return fetch(insereId.call(RECURSOS, id), config);
  }

  function deletaTask(id, Authorization) {
    const config = { ...configs.delete };

    config.headers.Authorization = Authorization;

    function insereId(id) {
      return this.tasksDeleta + id;
    }

    return fetch(insereId.call(RECURSOS, id), config);
  }

  return {
    criarUsuario,
    getUsuario,
    loginUsuario,
    pegarTasks,
    criarTask,
    atualizaTask,
    deletaTask,
  };
};

export default Repo();
