const RECURSOS = {
  login: "https://ctd-todo-api.herokuapp.com/v1/users/login",
};

class LoginRepo {
  // constructor() {
  //   const usuario = {
  //     email: "ricardo2@gmail.com.br",
  //     password: "123456",
  //   };
  // }

  static loginUsuario({ email, password }) {
    const obj = { email, password };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(obj),
    };

    return fetch(RECURSOS.login, config);
  }
}

export default LoginRepo;
