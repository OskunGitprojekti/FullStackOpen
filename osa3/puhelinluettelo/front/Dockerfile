FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --verbose

COPY . .

RUN yarn run build

EXPOSE 4173

CMD [ "npm", "run", "preview"]