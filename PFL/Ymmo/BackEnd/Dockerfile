FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --config prisma.config.ts
EXPOSE 3000
CMD ["node", "src/server.js"]