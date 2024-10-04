# Etapa 1: Construção da aplicação
FROM node:18 as build

WORKDIR /app

# Copiar os arquivos package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Rodar o build da aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação com http-server
FROM node:18-alpine

RUN npm install -g http-server

# Copiar os arquivos da build do estágio anterior
COPY --from=build /app/build /app/build

EXPOSE 3000

# Rodar o http-server para servir a aplicação
CMD ["http-server", "/app/build", "-p", "3000"]
