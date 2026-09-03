class CadastroPessoaService {
  constructor({ repositorio, notificador, garantirPessoaValida }) {
    this.repositorio = repositorio;
    this.notificador = notificador;
    this.garantirPessoaValida = garantirPessoaValida;
  }

  cadastrar(pessoa) {
    this.garantirPessoaValida(pessoa);
    const pessoaSalva = this.repositorio.salvar(pessoa);
    this.notificador.notificar(pessoaSalva);
    return pessoaSalva;
  }
}

module.exports = { CadastroPessoaService };