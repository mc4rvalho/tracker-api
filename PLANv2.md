# 🗺️ Planejamento: Tracker v2.0

## 🗄️ Sprint 1: O Novo Alicerce (Prisma & Banco de Dados)
Foco em evoluir a estrutura de dados para suportar as novas categorias e métricas de consumo.

- [ ] **Refatoração do `schema.prisma`**: Criar uma estrutura flexível que acomode Movie, Series, Game e Book.
- [ ] **Adição de campos de métricas**: Inserir `horasJogadas`, `paginasLidas`, `totalPaginas`, `episodiosAssistidos` e `totalEpisodios`.
- [ ] **Implementação de Enums de Status**: Criar os estados de progresso (`WISHLIST`, `IN_PROGRESS`, `FINISHED`).
- [ ] **Tags e Temporalidade**: Adicionar suporte a gêneros/tags (Array de strings) e o campo `dataFinalizacao`.

## ⚙️ Sprint 2: O Motor de Busca (NestJS + APIs Externas)
Transformar o Back-end num integrador de dados dinâmico através de serviços externos.

- [ ] **Integração TMDB (The Movie Database)**: Configurar busca de metadados, sinopses e capas para Filmes e Séries.
- [ ] **Integração RAWG**: Conectar à API de games para obter capas e detalhes técnicos de jogos.
- [ ] **Integração Open Library**: Configurar a busca de livros por título, autor ou ISBN.

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