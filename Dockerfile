FROM node

WORKDIR /personal-site

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]