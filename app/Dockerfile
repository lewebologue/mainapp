FROM node:22-alpine

ENV CI=TRUE

WORKDIR /usr/src/app

COPY . .

RUN npm ci --cache .npm --prefer-offline --loglevel=error

RUN npm run build:prod

FROM nginx:1.23-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist/browser /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
