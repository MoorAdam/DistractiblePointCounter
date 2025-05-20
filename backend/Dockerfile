FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm i && npm i typescript -g

copy . .

RUN npm i cors

RUN tsc

CMD ["node", "./comp/index.js"]


