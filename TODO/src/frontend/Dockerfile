# Stage 1: Build React app using Node 24
FROM node:24.15.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
