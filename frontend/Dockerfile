#stage 1
FROM node:16 as build
WORKDIR /app
COPY ./package*.json ./
# Install dependencies
RUN npm install --force

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run-script build

# Use Nginx as the production server
FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
