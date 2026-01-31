
# 🎬 CineTrack – Frontend

Este projeto consiste no frontend da aplicação **CineTrack**, desenvolvido com **React**, **TypeScript** e **Next.js**.  
O frontend é responsável por consumir a API REST desenvolvida em **Spring Boot**, oferecendo uma interface moderna, segura e organizada para gerenciamento de filmes.

A aplicação implementa autenticação via JWT, controle de acesso por perfil e um CRUD completo de filmes, seguindo boas práticas de desenvolvimento frontend.

---

## 🧱 Organização do Projeto

O projeto está estruturado de forma a facilitar a manutenção e evolução do código, separando responsabilidades entre:

- Páginas
- Componentes reutilizáveis
- Contextos globais
- Serviços de integração com a API

Essa separação garante maior legibilidade, reutilização de código e facilidade de manutenção.

---

## 🔐 Autenticação e Autorização

### Login

O frontend possui uma tela de login onde o usuário informa suas credenciais.  
Essas informações são enviadas ao backend através do endpoint de autenticação.

**Endpoint consumido:**
```
POST /auth/login
```

### Após o login

- O backend retorna um **token JWT**
- Retorna também as **roles do usuário**
- O token e as roles são armazenados no **localStorage**

**Arquivo responsável:**
```
utils/authStorage.ts
```

---

## 🔑 Contexto de Autenticação

A autenticação é gerenciada globalmente através do **AuthContext**, responsável por controlar:

- Token JWT
- Roles do usuário
- Estado de autenticação
- Login e logout
- Verificação de permissões

**Arquivo:**
```
contexts/AuthContext.tsx
```

---

## 🔒 Controle de Rotas Protegidas

O acesso às páginas protegidas é realizado por meio do componente **ProtectedRoute**, que verifica se o usuário está autenticado antes de permitir o acesso.

Usuários não autenticados são redirecionados automaticamente para a tela de login.

**Arquivo:**
```
components/ProtectedRoute.tsx
```

---

## 🎥 Funcionalidades da Aplicação

### 📄 Listagem de Filmes

- Usuários autenticados podem visualizar os filmes cadastrados
- A listagem suporta paginação
- É possível realizar busca por texto

### 🔍 Busca de Filmes

A busca é realizada de forma explícita, sendo executada apenas ao clicar no botão de busca.  
O frontend envia o termo de pesquisa ao backend utilizando parâmetros de consulta.

### 🧑‍💼 Controle de Acesso por Perfil

O frontend controla visualmente as funcionalidades com base nas **roles** retornadas no login.

**ROLE_USER**
- Visualização dos filmes em formato de cards

**ROLE_ADMIN**
- Visualização dos filmes em tabela
- Criação de novos filmes
- Edição de filmes existentes
- Exclusão de filmes

---

## 📝 Cadastro e Edição de Filmes

- Funcionalidade disponível apenas para usuários com perfil **ADMIN**
- Utiliza um modal com formulário reutilizável
- Integração direta com a API REST do backend

**Componentes envolvidos:**
```
FormularioFilme.tsx
Modal.tsx
TabelaFilmes.tsx
```

---

## 🔗 Integração com o Backend

O frontend consome a API REST desenvolvida em **Spring Boot**, utilizando os seguintes endpoints:

```
GET    /api/filmes
GET    /api/filmes/search
POST   /api/filmes
PUT    /api/filmes/{id}
DELETE /api/filmes/{id}
```

Os serviços de integração com a API estão centralizados na pasta:

```
services/
```

Essa abordagem garante reaproveitamento de código e facilidade de manutenção.

---

## ▶️ Como Executar o Frontend Localmente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend em execução

### Passos para Execução

1. Clonar o repositório:
```
 https://github.com/sergiodiogoti/front-end-cine-track.git
```

2. Acessar o diretório do projeto:
```
cd seu-repo-frontend
```

3. Instalar as dependências:
```
npm install
```

4. Executar a aplicação:
```
npm run dev
```

### Acesso à Aplicação

Após a execução, o frontend estará disponível em:
```
http://localhost:3000
```

O frontend se comunica com o backend rodando localmente, geralmente acessível pela porta **8080**.

---

## 🧪 Considerações Finais

O frontend foi desenvolvido utilizando **React com TypeScript e Next.js**, permitindo a criação de uma interface moderna, organizada e segura.

