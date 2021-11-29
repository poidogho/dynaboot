FROM node:13.8.0-alpine3.10

WORKDIR /dynaboot

COPY . /dynaboot

COPY package.json /dynaboot

RUN npm install

EXPOSE 8080

CMD ["node", "dist/server.js"]