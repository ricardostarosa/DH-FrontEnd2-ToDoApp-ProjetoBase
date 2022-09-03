// const getRidOfSpaces = (texto) => texto.trim();

// const isEmpty = (texto) => !texto || /^[\n\r\t ]+$/g.test(texto);

// const isEmailValid = (email) =>
//   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email);

// const isButtonLock = (list) => list.every((item) => item);

// export { getRidOfSpaces, isEmpty, isEmailValid, isButtonLock };

// To check a password between 7 to 15 characters which contain at least one numeric digit and a special character

class Valida {
  static getRidOfSpaces(texto) {
    return texto.trim();
  }

  static isEmpty(texto) {
    return !texto || /^[\n\r\t ]+$/g.test(texto);
  }

  static isEmailValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email);
  }

  static isButtonLock(list) {
    return list.every((item) => item);
  }

  static isPasswordValid(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/g.test(
      password
    );
  }
}

export default Valida;
