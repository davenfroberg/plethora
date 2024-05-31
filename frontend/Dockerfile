# Use a Node.js image to install npm packages and compile TypeScript
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages
RUN npm install

RUN npm install -g typescript

# Copy the rest of the source code
COPY . .

# Compile TypeScript into JavaScript
RUN tsc

# Use the official Apache image from the Docker Hub
FROM httpd:2.4

# Copy the compiled JavaScript and other website files to the default Apache directory
COPY --from=build /app /usr/local/apache2/htdocs/