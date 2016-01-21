FROM node:slim

EXPOSE 80

ENV NODE_ENV production

RUN mkdir /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD ["npm", "start"]
