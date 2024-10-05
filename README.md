# Bravo Studios User Registration

Este projeto é uma aplicação de registro e autenticação de usuários, utilizando **React (frontend)** e **NestJS (backend)**, com configuração via **Docker**.

## **Requisitos**

- [Docker](https://www.docker.com/) instalado no sistema.
- [Docker Compose](https://docs.docker.com/compose/) instalado no sistema.

## **Instruções para Rodar o Projeto**

### **Clonar o Repositório**

Clone o repositório para sua máquina local.

### **Rodar com Docker Compose**

Execute o seguinte comando para construir e rodar os contêineres do frontend e backend:

sudo docker-compose up --build

Esse comando:

Constrói e inicia dois contêineres, um para o frontend (React) e outro para o backend (NestJS).

### **Acessar a Aplicação:**

Frontend: http://localhost:3003 ou http://localhost:3000;

Backend: http://localhost:3002 ou http://localhost:3001.

### **Criar Usuários e Login**

Acesse o frontend e vá para a página de Cadastro para criar um novo usuário;

Após o cadastro, você poderá fazer login na aplicação.

### **Estrutura do Projeto**

frontend/: Contém o código React (frontend);

backend/: Contém o código NestJS (backend);

docker-compose.yml: Configuração para rodar os contêineres Docker.

### **Tecnologias Utilizadas**

Frontend: React, TypeScript;

Backend: NestJS, TypeORM;

Banco de Dados: SQLite (embutido no backend);

Docker: Para orquestrar os contêineres.
