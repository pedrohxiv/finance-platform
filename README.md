## Projeto Finance Platform

## Descrição do Projeto

A Finance Platform é uma plataforma de serviços financeiros desenvolvida para ajudar os usuários a rastrear suas receitas e despesas, categorizar transações e atribuí-las a contas específicas. Aprendi a como criar e monetizar um produto financeiro completo com a capacidade de importar transações usando um arquivo CSV, conectar contas bancárias usando Plaid e monetizar o produto usando Lemon Squeezy.

## Principais Funcionalidades

- **Dashboard Financeiro Interativo:** Um dashboard financeiro interativo que oferece uma visão geral das finanças do usuário.

- **Tipos de Gráficos Customizáveis:** Opção para alterar os tipos de gráficos para melhor visualização dos dados financeiros.

- **Filtros de Conta e Data:** Filtros de conta e data para visualizar transações específicas em determinados períodos.

- **Tabela de Transações Detalhada:** Exibição de uma tabela detalhada de transações com informações relevantes.

- **Formulário para Adicionar Transações:** Formulário intuitivo para adicionar novas transações financeiras.

- **Componentes Select Customizáveis:** Componentes de seleção personalizados para uma experiência de usuário mais agradável.

- **Alternador de Receita e Despesa:** Alternador para categorizar transações como receitas ou despesas.

- **Importação de Transações CSV:** Capacidade de importar transações financeiras usando um arquivo CSV.

- **API via Hono.js:** Implementação de uma API utilizando Hono.js para manipulação de dados.

- **Gerenciamento de Estado via Tanstack React Query:** Utilização do Tanstack React Query para gerenciamento de estado eficiente.

- **Conexões de Conta Bancária com Plaid:** Integração com Plaid para conexão de contas bancárias dos usuários.

- **Atualizações Premium via Lemon Squeezy:** Monetização do produto oferecendo atualizações premium via Lemon Squeezy.

- **Autenticação via Clerk (Core 2):** Sistema de autenticação seguro utilizando Clerk (Core 2) para acesso dos usuários.

- **Exclusão em Massa e Pesquisa em Transações:** Funcionalidades para exclusão em massa e pesquisa avançada em transações.

- **Desconexão Bancária e Gerenciamento de Assinaturas:** Opções para desconectar contas bancárias e gerenciar assinaturas de usuários.

- **Customização de Configurações do Usuário:** Personalização das configurações do usuário para uma experiência mais individualizada.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/backend`: ^1.1.5
- `@clerk/nextjs`: ^5.0.12
- `@hono/clerk-auth`: ^2.0.0
- `@hono/zod-validator`: ^0.2.1
- `@hookform/resolvers`: ^3.4.0
- `@neondatabase/serverless`: ^0.9.3
- `@paralleldrive/cuid2`: ^2.2.2
- `@radix-ui/react-checkbox`: ^1.0.4
- `@radix-ui/react-dialog`: ^1.0.5
- `@radix-ui/react-dropdown-menu`: ^2.0.6
- `@radix-ui/react-label`: ^2.0.2
- `@radix-ui/react-popover`: ^1.0.7
- `@radix-ui/react-select`: ^2.0.0
- `@radix-ui/react-separator`: ^1.0.3
- `@radix-ui/react-slot`: ^1.0.2
- `@radix-ui/react-tooltip`: ^1.0.7
- `@tanstack/react-query`: ^5.36.2
- `@tanstack/react-table`: ^8.17.3
- `class-variance-authority`: ^0.7.0
- `clsx`: ^2.1.1
- `date-fns`: ^3.6.0
- `drizzle-orm`: ^0.30.10
- `drizzle-zod`: ^0.5.1
- `hono`: ^4.3.7
- `lucide-react`: ^0.378.0
- `next`: 14.2.3
- `next-themes`: ^0.3.0
- `query-string`: ^9.0.0
- `react`: ^18.3.1
- `react-countup`: ^6.5.3
- `react-currency-input-field`: ^3.8.0
- `react-day-picker`: ^8.10.1
- `react-dom`: ^18.3.1
- `react-hook-form`: ^7.51.4
- `react-icons`: ^5.2.1
- `react-papaparse`: ^4.4.0
- `react-select`: ^5.8.0
- `react-use`: ^17.5.0
- `recharts`: ^2.12.7
- `sonner`: ^1.4.41
- `tailwind-merge`: ^2.3.0
- `tailwindcss-animate`: ^1.0.7
- `zod`: ^3.23.8
- `zustand`: ^4.5.2
- `@types/node`: ^20.12.12
- `@types/react`: ^18.3.2
- `@types/react-dom`: ^18.3.0
- `dotenv`: ^16.4.5
- `drizzle-kit`: ^0.21.2
- `eslint`: ^8.57.0
- `eslint-config-next`: 14.2.3
- `postcss`: ^8.4.38
- `tailwindcss`: ^3.4.3
- `tsx`: ^4.11.0
- `typescript`: ^5.4.5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_SECRET_KEY=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_UP_URL=seu_valor_aqui
DATABASE_URL=seu_valor_aqui
NEXT_PUBLIC_APP_URL=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. O projeto estará disponível em `http://localhost:3000`.
