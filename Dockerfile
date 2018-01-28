FROM node:8.9.3-alpine
WORKDIR /app/
COPY package.json .
RUN  npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]