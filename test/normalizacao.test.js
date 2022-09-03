import Valida from "../Validacoes/Normalizacao.js";

it("campo deve ser normalizado (ex: retirar espaços desnecessários)", () => {
  const caractere = Valida.getRidOfSpaces("teste");

  expect(caractere[0]).not.toBe(" ");

  expect(caractere[caractere.length - 1]).not.toBe(" ");
});

it("Nenhum dos campos pode ser vazio/nulo;", () => {
  const caractere = Valida.isEmpty("teste");
  const caractereVazio = Valida.isEmpty(" ");
  const caractereComQuebraLinha = Valida.isEmpty("\n");

  expect(caractere).toBe(false);

  expect(caractereVazio).toBe(true);

  expect(caractereComQuebraLinha).toBe(true);
});

it("O email deve ser de um tipo válido (ex: aplicar expressões regulares);", () => {
  const email = [
    "ricardo@gmail.com",
    "ricgmail@@_com",
    "Ricardo123@gmail.com",
    "",
  ];

  expect(Valida.isEmailValid(email[0])).toBe(true);

  expect(Valida.isEmailValid(email[1])).toBe(false);

  expect(Valida.isEmailValid(email[2])).toBe(true);
  expect(Valida.isEmailValid(email[3])).toBe(false);
});

it("O botão 'acesso' deve ser habilitado apenas quando todos os campos estiverem validados corretamente.", () => {
  expect(Valida.isButtonLock([false, false])).toBe(false);

  expect(Valida.isButtonLock([true, false])).toBe(false);

  expect(Valida.isButtonLock([true, true])).toBe(true);
});
it("To check a password between 7 to 15 characters which contain at least one numeric digit and a special character", () => {
  const password = ["ricardo@gmail2", "ricgmail2@", "Ricardo123@gmail.com", ""];

  expect(Valida.isPasswordValid(password[0])).toBe(true);

  expect(Valida.isPasswordValid(password[1])).toBe(true);

  expect(Valida.isPasswordValid(password[2])).toBe(false);
  expect(Valida.isPasswordValid(password[3])).toBe(false);
});
