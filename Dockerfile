FROM node

WORKDIR /personal-site

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]