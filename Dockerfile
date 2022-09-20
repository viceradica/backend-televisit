FROM node:lts-alpine

RUN mkdir -p /usr/server/app
WORKDIR /usr/server/app

# COPY ./.env /usr/server/app
COPY ./package.json /usr/server/app
# COPY ./server /usr/server/app

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 8090

CMD ["npm", "run", "dev:server"]