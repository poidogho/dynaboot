FROM alpine:latest

RUN apk add — no-cache nodejs npm

WORKDIR /dynaboot

COPY . /dynaboot

COPY package.json /dynaboot

RUN npm install
RUN npm install

COPY . /dynaboot

EXPOSE 8080

CMD [“node”, “dist/server.js”]