FROM node
WORKDIR /home/node/app
COPY package.json .
RUN npm install
COPY . .
