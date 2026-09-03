const { validar, garantirValido, PessoaInvalidaError } = require('../src/validations/pessoaFisica');

function formatarData(data) {
  const ano = data.getUTCFullYear();
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  const dia = String(data.getUTCDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function dataHaAnos(anos, diasExtras = 0) {
  const hoje = new Date();
  const data = new Date(Date.UTC(hoje.getUTCFullYear() - anos, hoje.getUTCMonth(), hoje.getUTCDate()));
  data.setUTCDate(data.getUTCDate() + diasExtras);
  return formatarData(data);
}

const pessoaValida = () => ({
  nome: 'Maria Souza',
  cpf: '111.444.777-35',
  email: 'maria@exemplo.com',
  data_nascimento: dataHaAnos(30),
  possui_cnh: false,
});

describe('validar - caminho feliz', () => {
  test('pessoa com todos os dados corretos nao gera erros', () => {
    expect(validar(pessoaValida())).toEqual([]);
  });
});

describe('validar - borda por campo', () => {
  test('nome: duas palavras de exatamente 2 letras e valido, uma com 1 letra e invalido', () => {
    expect(validar({ ...pessoaValida(), nome: 'Jo Li' })).toEqual([]);
    expect(validar({ ...pessoaValida(), nome: 'Jo L' })).toContain('nome: informe nome e sobrenome');
  });

  test('cpf: todos os digitos iguais e invalido mesmo com 11 digitos', () => {
    expect(validar({ ...pessoaValida(), cpf: '222.222.222-22' })).toContain('cpf: invalido');
  });

  test('email: minimo aceitavel e valido, sem ponto no dominio e invalido', () => {
    expect(validar({ ...pessoaValida(), email: 'a@b.co' })).toEqual([]);
    expect(validar({ ...pessoaValida(), email: 'a@bco' })).toContain('email: invalido');
  });

  test('data_nascimento: exatamente 120 anos e valido, 121 anos e invalido', () => {
    expect(validar({ ...pessoaValida(), data_nascimento: dataHaAnos(120) })).toEqual([]);
    expect(validar({ ...pessoaValida(), data_nascimento: dataHaAnos(121) }))
      .toContain('data_nascimento: idade maxima e 120 anos');
  });

  test('possui_cnh: precisa ser boolean de verdade, "sim" e invalido', () => {
    expect(validar({ ...pessoaValida(), possui_cnh: 'sim' }))
      .toContain('possui_cnh: informe true ou false');
  });
});

describe('validar - fronteiras dos 18 anos para possui_cnh', () => {
  test('exatamente 18 anos hoje com possui_cnh=true e valido', () => {
    const pessoa = { ...pessoaValida(), data_nascimento: dataHaAnos(18), possui_cnh: true };
    expect(validar(pessoa)).toEqual([]);
  });

  test('um dia antes de completar 18 anos com possui_cnh=true e invalido', () => {
    const pessoa = { ...pessoaValida(), data_nascimento: dataHaAnos(18, 1), possui_cnh: true };
    expect(validar(pessoa)).toContain('possui_cnh: so a partir de 18 anos');
  });
});

describe('validar - varios erros juntos', () => {
  test('nome, cpf e email invalidos ao mesmo tempo retornam os tres erros', () => {
    const erros = validar({ ...pessoaValida(), nome: 'X', cpf: '123', email: 'invalido' });
    expect(erros).toEqual(
      expect.arrayContaining([
        'nome: informe nome e sobrenome',
        'cpf: invalido',
        'email: invalido',
      ]),
    );
    expect(erros.length).toBeGreaterThanOrEqual(3);
  });
});

describe('garantirValido - excecao', () => {
  test('lanca PessoaInvalidaError com a lista de erros quando a pessoa e invalida', () => {
    expect(() => garantirValido({ ...pessoaValida(), nome: 'X' })).toThrow(PessoaInvalidaError);

    try {
      garantirValido({ ...pessoaValida(), nome: 'X', cpf: '123' });
    } catch (erro) {
      expect(erro.erros).toEqual(
        expect.arrayContaining(['nome: informe nome e sobrenome', 'cpf: invalido']),
      );
    }
  });

  test('nao lanca excecao quando a pessoa e valida', () => {
    expect(() => garantirValido(pessoaValida())).not.toThrow();
  });
});