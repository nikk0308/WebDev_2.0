FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
CMD ["npx", "nodemon", "index.js"]