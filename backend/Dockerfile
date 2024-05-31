FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN tsc

RUN apt-get update \
    && apt-get install -y vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Define the command to run the application
CMD [ "node", "app.js" ]