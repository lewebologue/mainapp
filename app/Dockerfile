FROM node:22-alpine

RUN npm install -g @angular/cli

WORKDIR /mainapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

CMD http-server dist/app -p 4200

EXPOSE 4200
