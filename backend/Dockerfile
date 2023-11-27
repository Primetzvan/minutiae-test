FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
#RUN npm install sqlite3
#RUN apt-get install mosquitto
#RUN apt-get install mosquitto-clients
#RUN npm install mqtt
COPY . .
#RUN npm run build
RUN npm run
EXPOSE 3000
#RUN npm run start:prod
#CMD ["npm", "run", "start:prod"]
CMD [ "node", "dist/main.js" ]
