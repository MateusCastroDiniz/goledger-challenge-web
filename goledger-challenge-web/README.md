# 📺 MSP TV Show Catalog

Sistema de gerenciamento de catálogo de séries, temporadas e episódios. O projeto permite o controle completo do ciclo de vida dos ativos, incluindo a exclusão em cascata (Série -> Temporadas -> Episódios) e navegação otimizada com paginação baseada em Bookmarks.

---

## 🚀 Escopo do Projeto

O objetivo principal é oferecer uma interface administrativa para gerenciar conteúdo de vídeo com as seguintes funcionalidades:

* **CRUD Completo:** Gerenciamento de Séries (TvShows), Temporadas (Seasons) e Episódios (Episodes).
* **Gestão de Hierarquia:** Cada série possui múltiplas temporadas, e cada temporada possui vários episódios vinculados.
* **Exclusão em Cascata:** Lógica robusta para garantir a integridade referencial, removendo todos os episódios e temporadas dependentes antes de excluir o ativo principal.
* **Paginação de Alta Performance:** Utilização de `bookmarks` (cursores) do CouchDB para navegação fluida em grandes volumes de dados.
* **Interface Moderna:** Desenvolvida com **Material UI (MUI)**, utilizando Skeletons para estados de carregamento e Accordions para organização de temporadas.

---

## 📁 Estrutura do Projeto

```text
.
├── src
│   ├── assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── Episodes
│   │   │   └── ModalEpisodeOperations.jsx
│   │   ├── Seasons
│   │   │   ├── AccordionSeasons.jsx
│   │   │   ├── ModalCreateSeason.jsx
│   │   │   └── ModalSeasonOperations.jsx
│   │   ├── tvShow
│   │   │   ├── CardTvShow.jsx
│   │   │   ├── ModalCreateTvShow.jsx
│   │   │   └── ModalUpdateTvShow.jsx
│   │   ├── HeaderApp.jsx
│   │   └── ModalDeleteAsset.jsx
│   ├── hooks
│   │   ├── Episodes
│   │   │   ├── useCreateEpisode.js
│   │   │   ├── useDeleteEpisode.js
│   │   │   └── useUpdateEpisode.js
│   │   ├── Seasons
│   │   │   ├── useCreateSeason.js
│   │   │   ├── useDeleteSeason.js
│   │   │   ├── useDetailSeasons.js
│   │   │   └── useUpdateSeason.js
│   │   ├── tvShow
│   │   │   ├── useCreateTvShow.js
│   │   │   ├── useDeleteTvShow.js
│   │   │   ├── useDetailShow.js
│   │   │   ├── useShows.js
│   │   │   └── useUpdateTvShow.js
│   │   ├── useCreateAsset.js
│   │   ├── useGetSchema.js
│   │   ├── useHandleClickModal.js
│   │   └── useSchemas.js
│   ├── pages
│   │   ├── Home.jsx
│   │   └── TvShowDetail.jsx
│   ├── services
│   │   └── apiServices.js
│   ├── styles
│   │   ├── App.css
│   │   ├── index.css
│   │   └── style.css
│   ├── utils
│   │   └── theme.js
│   ├── App.jsx
│   └── main.jsx
├── public
│   ├── favicon.svg
│   └── icons.svg
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js



Para executar o projeto rode
- npm install
- npm run dev

E acesse http://localhost:5173/home
