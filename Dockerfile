FROM node

WORKDIR /personal-site

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ]