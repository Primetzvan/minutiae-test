#stage 1
FROM node:16 as node
WORKDIR /src
COPY ./package.json .
RUN npm install --force
RUN npm run-script build
COPY . .
RUN npx serve -s build
