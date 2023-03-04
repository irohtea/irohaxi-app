FROM node:16-alpine

ENV APP /app
RUN mkdir $APP
WORKDIR $APP

COPY package*.json ./

RUN npm config set unsafe-perm true

RUN npm install --force

COPY . .

RUN chmod 777 /app/node_modules

RUN npm i express --save --user

RUN npm run build

EXPOSE 3000