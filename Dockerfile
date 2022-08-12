FROM node:latest

RUN mkdir -p Users/mac/node/eyeBlog

WORKDIR /Users/mac/node/eyeBlog 

COPY package.json /Users/mac/node/eyeBlog

RUN npm install

COPY . Users/mac/node/eyeBlog

EXPOSE 5000

CMD ["node", "server.js"]


