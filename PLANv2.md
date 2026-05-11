# 🗺️ Planejamento: Tracker v2.0

## 🗄️ Sprint 1: O Novo Alicerce (Prisma & Banco de Dados) -> (Domingo)
Foco em evoluir a estrutura de dados para suportar as novas categorias e métricas de consumo.

- [x] **Refatoração do `schema.prisma`**: Criar User e Role e uma estrutura flexível que acomode Movie, Series, Game e Book.
- [x] **Adição de campos de métricas**: Inserir `horasJogadas`, `paginasLidas`, `totalPaginas`, `episodiosAssistidos` e `totalEpisodios`.
- [x] **Implementação de Enums de Status**: Criar os estados de progresso (`WISHLIST`, `IN_PROGRESS`, `FINISHED`).
- [x] **Tags e Temporalidade**: Adicionar suporte a gêneros/tags (Array de strings) e o campo `finishedAt`.

## ⚙️ Sprint 2: O Motor de Busca (NestJS + APIs Externas)
Transformar o Back-end num integrador de dados dinâmico através de serviços externos.

- [x] **Limpeza Arquitetural**: Deletar a antiga pasta `tracker` (Resource legado da v1).
- [x] **Integração TMDB**: Criar módulo/serviço (`TmdbService`) isolado para buscar dados de Filmes e Séries.
- [x] **Integração RAWG**: Criar módulo/serviço isolado para a API de games.
- [x] **Integração Open Library**: Criar módulo/serviço isolado para a API de livros.
- [x] **Criação dos Domínios**: Gerar os Resources definitivos com o Nest CLI (`movies`, `series`, `books`, `games`).
- [ ] **A Grande Conexão**: Injetar cada serviço externo em seu respectivo domínio (ex: `TmdbService` dentro de `MoviesService`; `RawgService` em `GamesService`) e expor as rotas de busca nos Controllers definitivos.

## 🧠 Sprint 3: O Cérebro Matemático (Dashboard & `.reduce()`)
Implementação da inteligência de agregação de dados no servidor.

- [ ] **Criação da Rota `/dashboard`**: Endpoint dedicado para fornecer dados consolidados ao Front-end.
- [ ] **Lógica de Agregação (`.reduce()`)**: 
    - [ ] Cálculo da média geral de notas por categoria.
    - [ ] Somatório total de horas jogadas e páginas lidas.
- [ ] **Filtros e Contagem**: Lógica para agrupar itens por gênero e status de conclusão.

## 🎨 Sprint 4: O Espetáculo Visual (React + Tailwind)
Refatoração da UI/UX para exibir as novas funcionalidades e estatísticas.

- [ ] **Dark/Light Mode**: Implementação de tema dinâmico utilizando as classes de contexto do Tailwind CSS.
- [ ] **Componentes de Progresso**: Barras visuais baseadas na relação "atual vs total" (episódios/páginas).
- [ ] **Dashboard UI**: Cards de estatísticas de alto nível no topo da aplicação.

## 🔐 Sprint 5: Sistema de Autenticação (Auth & JWT)
Foco em proteger a aplicação, garantindo que cada usuário só veja os seus próprios dados.

- [ ] **Segurança de Senhas**: Instalar o `bcrypt` para criptografar as senhas antes de salvar no banco.
- [ ] **Módulo de Auth (NestJS)**: Criar as rotas de Registro e Login gerando um token JWT (JSON Web Token).
- [ ] **Proteção de Rotas (Guards)**: Bloquear o acesso aos endpoints do Tracker para quem não enviar um Token válido.
- [ ] **Telas de Acesso (React)**: Desenvolver as páginas de Login e Cadastro no Front-end.
- [ ] **Integração do Token**: Configurar o Axios para enviar o JWT no "Header" de todas as requisições.