FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install typescript
RUN npm install
RUN npm run build
CMD ["npm", "run", "prod"]
