FROM node:20

WORKDIR /app/ecommerce_frontend

COPY package*.json /app/ecommerce_frontend/
RUN npm config set strict-ssl false

RUN npm cache clean --force


RUN npm install

COPY . /app/ecommerce_frontend

# EXPOSE 3000

CMD ["npm","run","dev"]
