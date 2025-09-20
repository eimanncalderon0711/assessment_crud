# backend_nest/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Nest CLI
RUN npm install --save-dev @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
