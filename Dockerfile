#Primera Etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build:docker

#Segunda Etapa
FROM nginx:1.17.1-alpine

#conf
COPY nginx.conf /etc/nginx/nginx.conf

#copiar a share de nginx
COPY --from=build-step /app/dist/mini-encuesta-ang-t1 /usr/share/nginx/html/me2