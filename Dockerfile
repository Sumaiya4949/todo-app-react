FROM node:16-alpine3.15

COPY build app

RUN npm install -g serve

EXPOSE 5000

CMD [ "npx",  "serve", "-p", "5000", "-s", "app" ]