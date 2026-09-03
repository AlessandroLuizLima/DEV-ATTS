const { CadastroPessoaService } = require('../src/services/CadastroPessoaService');
const { garantirValido, PessoaInvalidaError } = require('../src/validations/pessoaFisica');

const pessoaValida = () => ({
  nome: 'Maria Souza',
  cpf: '111.444.777-35',
  email: 'maria@exemplo.com',
  data_nascimento: '1995-05-10',
  possui_cnh: false,
});

function criarService() {
  const repositorio = { salvar: jest.fn((pessoa) => ({ id: 1, ...pessoa })) };
  const notificador = { notificar: jest.fn() };
  const service = new CadastroPessoaService({
    repositorio,
    notificador,
    garantirPessoaValida: garantirValido,
  });
  return { service, repositorio, notificador };
}

describe('CadastroPessoaService', () => {
  test('pessoa valida: salva e notifica uma unica vez', () => {
    const { service, repositorio, notificador } = criarService();
    const resultado = service.cadastrar(pessoaValida());

    expect(repositorio.salvar).toHaveBeenCalledTimes(1);
    expect(repositorio.salvar).toHaveBeenCalledWith(pessoaValida());
    expect(notificador.notificar).toHaveBeenCalledTimes(1);
    expect(notificador.notificar).toHaveBeenCalledWith(resultado);
  });

  test('pessoa invalida: nao salva nem notifica, e lanca PessoaInvalidaError', () => {
    const { service, repositorio, notificador } = criarService();
    const pessoaInvalida = { ...pessoaValida(), nome: 'X' };

    expect(() => service.cadastrar(pessoaInvalida)).toThrow(PessoaInvalidaError);
    expect(repositorio.salvar).not.toHaveBeenCalled();
    expect(notificador.notificar).not.toHaveBeenCalled();
  });
});