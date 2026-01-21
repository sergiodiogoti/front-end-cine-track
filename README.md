# 🎬 CineTrack – Frontend

Frontend da aplicação **CineTrack**, desenvolvido com **React**, **TypeScript** e **Next.js**, responsável pela interface do usuário e pela integração com a API REST desenvolvida em **Spring Boot**.

O frontend consome os serviços do backend de forma segura, utilizando **autenticação JWT**, **controle de acesso por roles** e boas práticas de organização e gerenciamento de estado.

---

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Next.js (App Router)
- Context API
- Consumo de API REST (HTTP)
- Autenticação com JWT
- Controle de acesso por perfil (ROLE_USER / ROLE_ADMIN)
- CSS customizado

---

## 🏗️ Estrutura do Projeto

O projeto utiliza a estrutura do **Next.js App Router**, organizada da seguinte forma:

```text
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (app)/
│   │   └── filmes/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── CardFilmes.tsx
│   ├── FormularioFilme.tsx
│   ├── Modal.tsx
│   ├── ProtectedRoute.tsx
│   └── TabelaFilmes.tsx
│
├── contexts/
│   ├── AuthContext.tsx
│   └── FilmesContext.tsx
│
├── services/
│   ├── api.ts
│   ├── auth.services.ts
│   └── filmes.service.ts
│
├── styles/
├── types/
└── utils/
    └── authStorage.ts
Essa organização facilita a manutenção do código, separando responsabilidades entre páginas, componentes, contexto global e serviços de integração com a API.

🔐 Autenticação e Autorização
Login
O frontend possui uma tela de login, onde o usuário informa suas credenciais.
Essas informações são enviadas para o backend através do endpoint de autenticação.

Endpoint consumido:

http
Copiar código
POST /auth/login
Após o login:

O backend retorna um token JWT

Retorna também as roles do usuário

O token e as roles são armazenados no localStorage

Arquivo responsável:

bash
Copiar código
utils/authStorage.ts
Contexto de Autenticação
A autenticação é gerenciada globalmente através do AuthContext, que controla:

Token JWT

Roles do usuário

Estado de autenticação

Login e logout

Verificação de permissões

Arquivo:

Copiar código
contexts/AuthContext.tsx
Controle de Rotas Protegidas
O acesso às páginas protegidas é feito utilizando o componente ProtectedRoute, que verifica se o usuário está autenticado antes de permitir o acesso.

Arquivo:

Copiar código
components/ProtectedRoute.tsx
Usuários não autenticados são redirecionados automaticamente para a tela de login.

🎥 Funcionalidades da Aplicação
Listagem de Filmes
Usuários autenticados podem visualizar os filmes cadastrados

A listagem suporta paginação

É possível realizar busca por texto

Busca de Filmes
A busca é integrada ao backend utilizando parâmetros de consulta, permitindo filtrar os filmes pelo texto informado.

Controle de Acesso por Perfil
O frontend controla visualmente as funcionalidades com base nas roles:

ROLE_USER
Visualização dos filmes em formato de cards

ROLE_ADMIN
Visualização em tabela

Criação de novos filmes

Edição de filmes existentes

Exclusão de filmes

Esse controle é feito utilizando as roles retornadas no login.

Cadastro e Edição de Filmes
Disponível apenas para usuários ADMIN

Utiliza um Modal com formulário reutilizável

Integração direta com a API REST do backend

Componentes envolvidos:

mathematica
Copiar código
FormularioFilme.tsx
Modal.tsx
TabelaFilmes.tsx
🔗 Integração com o Backend
O frontend consome a API REST desenvolvida em Spring Boot, utilizando os seguintes endpoints:

http
Copiar código
GET    /api/filmes
GET    /api/filmes/search
POST   /api/filmes
PUT    /api/filmes/{id}
DELETE /api/filmes/{id}
Os serviços de integração estão centralizados na pasta:

Copiar código
services/
Isso garante reaproveitamento de código e facilidade de manutenção.

▶️ Como Executar o Frontend Localmente
Pré-requisitos
Node.js (versão 18 ou superior)

npm ou yarn

Backend em execução

Passos para Execução
Clonar o repositório:

bash
Copiar código
git clone https://github.com/SEU_USUARIO/seu-repo-frontend.git
Acessar o diretório do projeto:

bash
Copiar código
cd seu-repo-frontend
Instalar as dependências:

bash
Copiar código
npm install
Executar a aplicação:

bash
Copiar código
npm run dev
Acesso à Aplicação
Após a execução, o frontend estará disponível em:

arduino
Copiar código
http://localhost:3000
O frontend se comunica com o backend rodando em:

arduino
Copiar código
http://localhost:8080
Caso necessário, a URL do backend pode ser configurada via variável de ambiente.

🧪 Considerações Finais
O frontend foi desenvolvido utilizando React com TypeScript e Next.js, permitindo a criação de uma interface moderna, organizada e segura. A aplicação está totalmente integrada ao backend em Spring Boot, atendendo aos requisitos de um projeto full stack, com controle de acesso, autenticação JWT e boas práticas de desenvolvimento.