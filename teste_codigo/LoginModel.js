// import {
//   getRidOfSpaces,
//   isEmpty,
//   isEmailValid,
//   isButtonLock,
// } from "../funcoes/normalizacao.js";

class Login {
  #email;
  #senha;

  insereEmail(email) {
    this.#email = email;
  }

  insereSenha(senha) {
    this.#senha = senha;
  }

  get email() {
    return this.#email;
  }

  get senha() {
    return this.#senha;
  }
}

export default Login;

// const email = document.querySelector("#inputEmail");
// const senha = document.querySelector("#inputPassword");
// const botao = document.querySelector("button");

// const booleanList = [false, false];

// botao.style.backgroundColor = "red";

// email.addEventListener("blur", (event) => {
//   event.preventDefault();
//   event.stopPropagation();

//   booleanList[0] = !isEmpty(isEmailValid(getRidSpaces(event.target.value)));

//   console.log(getRidSpaces(event.target.value));
//   console.log(event.target.value);

//   console.log(isButtonLock(booleanList));

//   if (isButtonLock(booleanList)) {
//     botao.style.backgroundColor = "purple";

//     botao.removeAttribute("disabled");
//   } else {
//     botao.style.backgroundColor = "red";
//     botao.setAttribute("disabled", true);
//   }
// });

// senha.addEventListener("blur", (event) => {
//   event.preventDefault();
//   event.stopPropagation();

//   booleanList[1] = !isEmpty(getRidSpaces(event.target.value));

//   console.log(getRidSpaces(event.target.value));
//   console.log(event.target.value);

//   console.log(isButtonLock(booleanList));

//   if (isButtonLock(booleanList)) {
//     botao.style.backgroundColor = "purple";

//     botao.removeAttribute("disabled");
//   } else {
//     botao.style.backgroundColor = "red";
//     botao.setAttribute("disabled", true);
//   }
// });
