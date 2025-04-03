FROM node:22-alpine

RUN npm install -g @angular/cli

WORKDIR /
RUN mkdir mainapp-app
WORKDIR /mainapp-app

ENV APP_NAME 'MainApp'
ENV ROUTING 'true'
ENV STANDALONE 'false'
ENV STRICT 'true'
ENV STYLE 'scss'

CMD ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE \
    && mv $APP_NAME/* . \
    && rm -rf $APP_NAME \
    && ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200
