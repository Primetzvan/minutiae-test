#stage 1
FROM node:16 as build
WORKDIR /src
COPY ./package.json /src/
COPY public/ /src/public
COPY src/ /src/src
RUN npm install --force
COPY . . 
#RUN npm run-script build
CMD ["npm","run-script","build"]
#RUN npx serve -s build

FROM nginx:stable-alpine
COPY --from=build /src/build /usr/share/nginx/html
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
