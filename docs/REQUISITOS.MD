# Requisitos do Projeto — Sistema RBAC

## 1. Visão Geral

Este projeto tem como objetivo desenvolver um sistema de controle de acesso baseado em papéis
(RBAC — Role-Based Access Control), permitindo gerenciar usuários, papéis (roles) e permissões
de forma flexível e segura.

O sistema servirá como base para aplicações que precisem restringir o acesso a recursos
de acordo com o papel de cada usuário (ex: administrador, editor, visualizador).

## 2. Objetivos

- Permitir o cadastro e autenticação de usuários.
- Gerenciar papéis (roles) e permissões de forma independente.
- Associar múltiplos papéis a um usuário.
- Restringir o acesso a rotas/recursos com base nas permissões do usuário autenticado.
- Disponibilizar uma API documentada e testável.

## 3. Escopo

### Incluído nesta versão (v0.1.0)
- Modelagem do banco de dados (usuários, papéis, permissões)
- Cadastro e login de usuários
- Autenticação via token (JWT)
- CRUD de roles e permissions
- Middleware de autorização baseado em permissões
- Testes unitários do módulo de autorização

### Fora do escopo desta versão
- Interface gráfica (frontend)
- Recuperação de senha por e-mail
- Auditoria de logs de acesso
- Multi-tenancy

## 4. Requisitos Funcionais

| Código | Descrição |
|--------|-----------|
| RF01   | O sistema deve permitir o cadastro de novos usuários |
| RF02   | O sistema deve permitir login com e-mail e senha |
| RF03   | O sistema deve gerar um token de autenticação (JWT) após login |
| RF04   | O sistema deve permitir criar, listar, editar e remover roles |
| RF05   | O sistema deve permitir criar, listar, editar e remover permissions |
| RF06   | O sistema deve permitir associar uma ou mais roles a um usuário |
| RF07   | O sistema deve bloquear o acesso a rotas protegidas caso o usuário não tenha a permissão necessária |

## 5. Requisitos Não Funcionais

| Código | Descrição |
|--------|-----------|
| RNF01  | O sistema deve armazenar senhas de forma criptografada (hash) |
| RNF02  | A API deve responder em formato JSON |
| RNF03  | O código deve seguir uma estrutura de pastas organizada (`src/`, `db/migrations/`, `tests/`) |
| RNF04  | As variáveis sensíveis (chaves, credenciais) não devem ser versionadas — usar `.env` |

## 6. Estrutura de Dados (visão inicial)

**users**
- id
- name
- email
- password_hash
- created_at

**roles**
- id
- name (ex: admin, editor, viewer)
- description

**permissions**
- id
- name (ex: users:create, posts:delete)
- description

**user_roles** (tabela associativa)
- user_id
- role_id

**role_permissions** (tabela associativa)
- role_id
- permission_id

## 7. Tecnologias (ajustar conforme decisão do grupo)

- Linguagem: _[definir — Node.js / Python / etc.]_
- Banco de dados: _[definir — PostgreSQL / MySQL / SQLite]_
- Autenticação: JWT
- Testes: _[definir — Jest / Pytest / etc.]_

## 8. Equipe e Responsabilidades

| Integrante | Responsabilidade |
|------------|-------------------|
| [Nome 1]   | Modelagem de banco / migrations |
| [Nome 2]   | Autenticação e login |
| [Nome 3]   | CRUD de roles e permissions |
| [Nome 4]   | Middleware de autorização e testes |

## 9. Referências

- Conceito de RBAC (NIST)
- Documentação da tecnologia escolhida para autenticação (JWT)