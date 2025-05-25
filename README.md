# RocketLab Shop

Uma aplicação de e-commerce feita com React, TypeScript e Vite.

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/MateusNeeves/AtividadeFrontend-RocketlabDEV.git
   cd AtividadeFrontend-RocketlabDEV
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

### Rodando a aplicação

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173) (ou na porta exibida no terminal).

## Estrutura do Projeto

- `src/pages/Home/` - Página inicial e listagem de produtos
- `src/pages/Product/` - Página de detalhes do produto
- `src/pages/Cart/` - Página do carrinho de compras
- `src/pages/components/` - Componentes compartilhados (Menu, etc)
- `src/context/CartContext.tsx` - Contexto e lógica do carrinho
- `src/data/products.json` - Dados dos produtos

## Funcionalidades

- Listagem de produtos com filtros, ordenação e paginação
- Página de detalhes do produto com imagens, informações e avaliações
- Carrinho de compras com adicionar/remover e simulação de checkout
- Layout responsivo

---

> Este projeto foi criado com [Vite](https://vitejs.dev/) e utiliza [React](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/).
