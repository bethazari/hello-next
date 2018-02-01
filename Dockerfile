FROM node:8.9.3-alpine
WORKDIR /app/
COPY package.json .
RUN  npm install
COPY . .
EXPOSE 80
ENTRYPOINT ["npm", "run", "dev"]