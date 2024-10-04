# Usando uma imagem Node.js oficial
FROM node:18

# Criar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Expor a porta do backend (NestJS geralmente usa a 3001)
EXPOSE 3001

# Rodar o backend (NestJS)
CMD ["npm", "run", "start"]
