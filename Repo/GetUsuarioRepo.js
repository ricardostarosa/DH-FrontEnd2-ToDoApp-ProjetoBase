const RECURSOS = {
  users: "https://ctd-todo-api.herokuapp.com/v1/users/getMe",
};

class GetUsuario {
  static getUsuario(Authorization) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    };

    return fetch(RECURSOS.users, config);
  }
}

export default GetUsuario;
