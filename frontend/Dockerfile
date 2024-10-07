# Define a imagem base usando a versão LTS do Node.js
FROM node:lts as builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala todas as dependências listadas no package.json
RUN npm install

# Copia todo o código da aplicação para o contêiner
COPY . .

# Executa o script de build da aplicação React, criando a versão otimizada
RUN npm run build

# Define a imagem base usando a imagem mais recente do Nginx
FROM nginx:latest

# Copia os arquivos gerados na etapa de build para o diretório do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Informa ao Docker que o contêiner escutará na porta 80
EXPOSE 80

# Define o comando padrão para iniciar o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]
