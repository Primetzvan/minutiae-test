#stage 1
FROM node:16 as node
WORKDIR /src
COPY ./package.json .
RUN npm install --force
COPY . .
CMD npm start
