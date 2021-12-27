FROM node:17-alpine
COPY . .
RUN npm install
RUN npx tsc
CMD ["npm", "run", "start:prod"]
