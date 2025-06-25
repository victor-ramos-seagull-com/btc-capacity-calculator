FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY server.js .
COPY index.html .
COPY styles.css .
COPY script.js .
COPY assets ./assets
RUN npm install --production || true
EXPOSE 3000
CMD ["npm", "start"]
