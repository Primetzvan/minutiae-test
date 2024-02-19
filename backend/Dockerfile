FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
#RUN npm install sqlite3
#RUN apt-get install mosquitto
#RUN apt-get install mosquitto-clients
#RUN npm install mqtt

COPY . .

# Machen Sie das Einstiegsskript verfügbar und ausführbar
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Setzen Sie das Einstiegsskript als Entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

RUN npm run build
#RUN npm run
EXPOSE 3000
#RUN npm run start:prod
#CMD ["npm", "run", "start:prod"]
CMD [ "node", "dist/main.js" ]
