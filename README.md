# Gerenciador de Produtos Full-Stack 📱

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Este é um aplicativo completo para gerenciamento de produtos, construído como um monorepo contendo um backend em Node.js e um frontend em React Native (Expo). O projeto demonstra um fluxo de trabalho full-stack, desde a API RESTful até a interface de usuário interativa.

## ✨ Funcionalidades

- **Dashboard Dinâmico:** Tela inicial com estatísticas em tempo real, como contagem total de produtos e valor total do estoque.
- **CRUD Completo de Produtos:**
    - **Criar:** Adicionar novos produtos através de um formulário moderno e validado.
    - **Listar:** Visualizar todos os produtos em uma lista clara e organizada.
    - **Editar:** Atualizar as informações de qualquer produto existente.
    - **Deletar:** Remover produtos do catálogo com um diálogo de confirmação.
- **Validação Robusta:** Validação de dados tanto no cliente (frontend) quanto no servidor (backend) usando **Zod**, garantindo a integridade dos dados.
- **Código Compartilhado:** Utilização de um pacote `shared` dentro do monorepo para compartilhar tipos e schemas de validação entre o frontend e o backend.
- **Navegação Profissional:** Fluxo de navegação completo entre as telas, com headers, títulos e botões de "voltar".

## 🛠️ Stack de Tecnologias

O projeto é dividido em duas aplicações principais e um pacote compartilhado.

#### Backend (`apps/backend`)
- **Framework:** Node.js com Express.js
- **Linguagem:** TypeScript
- **ORM:** Prisma para comunicação com o banco de dados.
- **Banco de Dados:** MySQL
- **Validação:** Zod

#### Frontend (`apps/frontend`)
- **Framework:** React Native com Expo (SDK 49)
- **Linguagem:** TypeScript
- **Gerenciamento de Formulários:** React Hook Form com Zod Resolver
- **Navegação:** React Navigation (Stack)
- **Requisições HTTP:** Axios

#### Pacote Compartilhado (`packages/shared`)
- **Validação e Tipos:** Zod para criar schemas e tipos que são utilizados tanto pelo frontend quanto pelo backend.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Um servidor de banco de dados MySQL rodando.

### 1. Clonar e Instalar

Primeiro, clone o repositório e instale todas as dependências a partir da raiz do projeto.

```bash
git clone https://github.com/Math23Kskb/mobile-react-native.git
cd mobile-react-native
npm install
```
*(Este comando instalará as dependências para todos os workspaces: `backend`, `frontend` e `shared`.)*

### 2. Configurar o Backend e o Banco de Dados

Você precisará configurar a conexão com o seu banco de dados MySQL.

```bash
# Navegue até a pasta do backend
cd apps/backend

# Crie o arquivo de ambiente a partir do exemplo
cp .env.example .env
```
Agora, abra o arquivo `.env` e substitua a `DATABASE_URL` pela string de conexão do seu banco de dados. Exemplo:
```
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
```

### 3. Preparar o Banco de Dados

Com a conexão configurada, aplique as migrações para criar as tabelas e, opcionalmente, popule o banco com dados iniciais.

```bash
# Ainda na pasta apps/backend

# Aplica as migrações (cria as tabelas)
npx prisma migrate dev

# Popula o banco com 15 produtos de exemplo
npx prisma db seed
```

### 4. Iniciar os Servidores

A aplicação requer dois servidores rodando simultaneamente em terminais separados.

#### 🏁 Iniciar o Servidor do Backend
```bash
# No terminal 1, dentro de apps/backend
npm run dev
```
O servidor da API estará disponível em `http://localhost:3333`.

#### 🏁 Iniciar o Servidor do Frontend
```bash
# No terminal 2, dentro de apps/frontend
npx expo start
```
Isso abrirá o Metro Bundler. Você pode então abrir o aplicativo no seu navegador (pressionando `w`), em um emulador Android/iOS ou escaneando o QR code com o app Expo Go no seu celular.

---

Feito por **Math23Kskb**.