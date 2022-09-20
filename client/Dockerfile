FROM node:14-slim


RUN mkdir -p /usr/client/app
WORKDIR /usr/client/app

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]