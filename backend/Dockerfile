FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
#RUN npm install sqlite3
#RUN apt-get install mosquitto
#RUN apt-get install mosquitto-clients
COPY . .
RUN npm run 
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

